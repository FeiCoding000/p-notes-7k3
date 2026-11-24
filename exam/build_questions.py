"""把 AI-103_真题题库.md 解析成 questions.js，供 模拟考试器.html 使用。
用法：python exam/build_questions.py   ->  生成 exam/questions.js，然后双击 模拟考试器.html   （题库 md 更新后重新跑一次）
"""
import json, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
MD = ROOT / "AI-103_真题题库.md"
OUT = ROOT / "exam" / "questions.js"

text = MD.read_text(encoding="utf-8")
blocks = re.split(r"^## Question (\d+)(.*)$", text, flags=re.M)

# 截图里有、但 OCR 没识别出来、也没有 Most Voted 的答案
OVERRIDES = {105: "D"}

questions = []
for i in range(1, len(blocks), 3):
    qid = int(blocks[i])
    tags = re.findall(r"`([^`]+)`", blocks[i + 1])
    body = blocks[i + 2].split("\n---", 1)[0] if "\n---" in blocks[i + 2] else blocks[i + 2]

    case = ""
    m = re.search(r"<details>.*?</summary>(.*?)</details>", body, flags=re.S)
    if m:
        case = m.group(1).strip()
        body = body[: m.start()] + body[m.end():]

    images = re.findall(r"!\[[^\]]*\]\(([^)]+)\)", body)

    # 评论
    comments = ""
    if "**评论：**" in body:
        body, comments = body.split("**评论：**", 1)
        comments = comments.strip()

    vote = ""
    mv = re.search(r"^社区投票：(.*)$", body, flags=re.M)
    if mv:
        vote = mv.group(1).strip()

    answer = ""
    ma = re.search(r"Correct Answer:\s*([A-Za-z]*)\*\*", body)
    if ma:
        answer = ma.group(1).upper()

    options, voted = [], []
    stem_lines = []
    for line in body.split("\n"):
        # 兼容 OCR 丢了 "- " 或空格的选项行（如 "A.serverless APl"），只接受按字母顺序出现的下一个选项
        mo = re.match(r"^(?:- )?([A-H])\.\s*(.+?)\s*$", line)
        if mo and mo.group(1) == "ABCDEFGH"[len(options)]:
            key, t = mo.group(1), mo.group(2).strip()
            if re.search(r"\s*Most Voted\s*$", t):
                voted.append(key)
                t = re.sub(r"\s*Most Voted\s*$", "", t)
            options.append({"key": key, "text": t})
        elif not options and not line.startswith("![") and "Correct Answer" not in line:
            stem_lines.append(line.rstrip())

    stem = "\n".join(stem_lines).strip()
    stem = re.sub(r"^(HOTSPOT|DRAG DROP)\s*-?\s*\n", "", stem)

    src = "official"
    if qid in OVERRIDES:  # 手动从截图核对过的答案
        answer, src = OVERRIDES[qid], "screenshot"
    if options and not answer:
        answer = "".join(voted)
        src = "voted" if answer else "none"

    kind = "choice" if options else ("dragdrop" if "DRAG DROP" in tags else "hotspot")
    if kind == "choice" and len(answer) > 1:
        kind = "multi"

    questions.append({
        "id": qid, "tags": tags, "kind": kind, "case": case, "stem": stem,
        "options": options, "answer": answer, "answerSource": src,
        "vote": vote, "comments": comments,
        "images": images,
    })

OUT.write_text("window.QUESTIONS = " + json.dumps(questions, ensure_ascii=False) + ";\n", encoding="utf-8")

from collections import Counter
print(f"共 {len(questions)} 题 ->", OUT)
print(Counter(q["kind"] for q in questions))
print("答案来源:", Counter(q["answerSource"] for q in questions if q["options"]))
