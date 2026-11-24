// HOTSPOT / 拖拽题的交互数据（从截图手动整理）。
// 不在这里的图片题，仍然用“看截图自评”的方式。
//
// 格式：
//   下拉 / Yes-No 题： { type: "select", items: [ { label, options: [...], answer: 正确选项下标 } ] }
//                      options 恰好是 ["Yes","No"] 时显示为单选按钮
//   拖拽题：           { type: "drag", pool: [...可拖的选项], slots: [ { label, answer: pool 下标 } ], ordered?: true }
//   prompt（可选）：   题干补充说明，显示在作答区上方
//   code（可选）：     作答需要参考的代码，显示在作答区上方
//   exhibit（可选）：  不含答案的题目截图（代码、表格等），作答时显示
//   doubt（可选）：    截图答案存疑的说明，判分后显示
const YN = ["Yes", "No"], Y = 0, N = 1;
const yn = (...rows) => rows.map(([label, answer]) => ({ label, options: YN, answer }));

window.INTERACTIVE = {
  1: { type: "select", prompt: "为 Agent1 的模型部署选择配置（对应案例里的 Planned Changes 和 Technical Requirements）。",
    items: [
      { label: "Deployment type", options: ["Standard", "Global Standard", "Global Provisioned"], answer: 0 },
      { label: "Version update policy", options: ["Once the current version expires", "Opt out of automatic model version upgrades", "Upgrade once a new default version becomes available"], answer: 1 },
    ] },
  4: { type: "select", items: yn(
      ["The LangChain service will appear in Traces without configuring a tracer.", N],
      ["Setting different OTEL_SERVICE_NAME values separates the services in Application Insights.", Y],
      ["When using enable_content_recording=False, prompts and tool data will be captured in the telemetry.", N]) },
  5: { type: "drag",
    pool: ["Multi-file task in pro mode", "Multi-file task in standard mode", "Single-file task in pro mode", "Single-file task in standard mode"],
    slots: [{ label: "Pipeline1", answer: 3 }, { label: "Pipeline2", answer: 0 }] },
  6: { type: "select", exhibit: ["img/q006_p012.jpg"],
    items: [
      { label: "credential = ____()", options: ["AzureKeyCredential", "ClientSecretCredential", "DefaultAzureCredential"], answer: 2 },
      { label: "response = openai_client.responses.____(model=..., input=...)", options: ["compact", "create", "retrieve"], answer: 1 },
    ] },
  7: { type: "select", items: [
      { label: "If/else condition expression", options: ["IsBlank(Local.Var01)", "IsEmpty(Local.Var01)", "Not(IsBlank(Local.Var01))"], answer: 2 },
      { label: "Send message expression", options: ["{Local.Var01}", "{Upper(Local.Var01)}", "{Upper(Var01)}"], answer: 1 },
    ] },
  8: { type: "select", items: [
      { label: "Guardrails", options: ["Select Tool call and set Action to Block.", "Select User input and Output and set Action to Annotate.", "Select User input and Tool response and set Action to Annotate.", "Select User input, Output, Tool response, and Tool call and set Action to Block."], answer: 3 },
      { label: "Storage access", options: ["Storage account access keys", "A user-assigned identity that is assigned the Storage Queue Data Contributor role", "A system-assigned managed identity that is assigned the Storage Blob Data Reader role", "A system-assigned managed identity that is assigned the Storage Blob Data Contributor role"], answer: 2 },
    ] },
  11: { type: "select", exhibit: ["img/q011_p018.jpg"], items: [
      { label: "steps → id: approval → type:", options: ["ask_question", "basic_chat", "data_transformation"], answer: 0 },
      { label: "steps → id: execute_refund → condition:", options: ['approval == "approved"', "propose_refund.output != null", "true"], answer: 0 },
    ] },
  15: { type: "drag",
    pool: ["Groundedness evaluation metrics", "Latency breakdown traces", "Risk and safety metrics", "Token usage analytics"],
    slots: [{ label: "Unsupported responses", answer: 0 }, { label: "Policy violations", answer: 2 }] },
  18: { type: "select", items: [
      { label: "Metrics to enable", options: ["Model Availability Rate and Provisioned Utilization", "Only Tokens Cache Match Rate", "Only Total Requests filtered to status code 200", "Time To Response and Total Tokens"], answer: 0 },
      { label: "Diagnostic log to collect", options: ["AllMetrics", "audit", "RequestResponse", "trace"], answer: 2 },
    ] },
  20: { type: "select", items: [
      { label: "Set tool_choice to", options: ["auto", "none", "required"], answer: 2 },
      { label: "Configure the tool to authenticate by", options: ["Storing API keys in prompts", "Using the shared project agent identity", "Using a distinct agent identity bound to the client application"], answer: 2 },
    ] },
  30: { type: "drag", prompt: 'run_payload = { "assistant_id": agent_id, [Value] : [Value], "metadata": {...} }',
    pool: ['"auto"', '"required"', '"response_format"', '"tool_choice"', '"tools"', '"type"'],
    slots: [{ label: "键（key）", answer: 3 }, { label: "值（value）", answer: 1 }] },
  32: { type: "drag",
    pool: ["Code interpreter", "Computer use", "File search", "Grounding with Bing Search", "Microsoft Fabric"],
    slots: [
      { label: "Access up-to-date information from public websites", answer: 3 },
      { label: "Perform calculations during conversations", answer: 0 },
      { label: "Retrieve information from documents uploaded directly to the agent", answer: 2 },
    ] },
  35: { type: "select", exhibit: ["img/q035_p043.jpg"], items: [
      { label: "temperature=", options: ["0", "1", "2"], answer: 0 },
      { label: 'output_config={"effort": ____}', options: ['"high"', '"low"', '"medium"'], answer: 0 },
    ] },
  37: { type: "select", items: [
      { label: "To retain user preferences across conversations, use:", options: ["Agent memory that uses persistent storage", "Conversation history", "Orchestration-managed session context"], answer: 0 },
      { label: "To enable users to provide contextual grounding during chats, use the:", options: ["Azure AI Search tool", "Code interpreter tool", "File search tool"], answer: 2 },
    ] },
  40: { type: "select", items: [
      { label: "Authentication method", options: ["A personal access token (PAT)", "A user-assigned managed identity", "An Azure Login action that uses OpenID Connect (OIDC)"], answer: 2 },
      { label: "If the evaluation results are NOT met, configure the workflow to", options: ["Lock the target branch", "Send an alert", "Fail"], answer: 2 },
    ] },
  49: { type: "select", items: [
      { label: "Prompt shields action", options: ["Disable the shield.", "Set action to block.", "Set action to annotate."], answer: 1 },
      { label: "Additional mitigation", options: ["Enable Spotlighting.", "Create a custom blocklist.", "Use optical character recognition (OCR) to extract the text from the images first."], answer: 0 },
    ] },
  66: { type: "select", exhibit: ["img/q066_p076.jpg"], items: [
      { label: "video = client.videos.____(model=deployment_name, prompt=...)", options: ["create", "download_content", "list", "retrieve"], answer: 0 },
      { label: "循环里：video = client.videos.____(video.id)", options: ["create", "download_content", "list", "retrieve"], answer: 3 },
    ] },
  68: { type: "select", exhibit: ["img/q068_p087.jpg"], items: [
      { label: "project_client = AIProjectClient(endpoint=myEndpoint, credential=____)", options: ["AzureKeyCredential()", "DefaultAzureCredential()", "None"], answer: 1 },
      { label: "agent = project_client.agents.____(agent_name=myAgent)", options: ["create_version", "get", "get_version"], answer: 1 },
    ] },
  71: { type: "select", exhibit: ["img/q071_p091.jpg"], items: [
      { label: "To measure whether the responses are supported by the provided context and address the user query:", options: ["Coherence and Fluency", "GPT similarity and F1 score", "Groundedness and Relevance", "Groundedness and ROUGE score"], answer: 2 },
      { label: "To measure whether responses contain sensitive or proprietary information:", options: ["Hateful and unfair content", "Indirect attack", "Protected material", "Violent content"], answer: 2 },
    ] },
  77: { type: "drag",
    code: 'memory_tool = MemorySearchTool(\n    memory_store_name=mem_store_name,\n    scope=[ 空 1 ],\n)\nagent_def = PromptAgentDefinition(\n    model="gpt-5.2",\n    instructions="You are a customer support assistant.",\n    tools=[ 空 2 ]\n)',
    pool: ['"session"', '"{{$conversationId}}"', '"{{$userId}}"', "[mem_store_name]", "[memory_tool]", 'MemorySearchTool("support_mem_store")'],
    slots: [{ label: "空 1：scope=", answer: 2 }, { label: "空 2：tools=", answer: 4 }] },
  79: { type: "select", exhibit: ["img/q079_p098.jpg"], items: [
      { label: "Orchestration pattern", options: ["The sequential template that passes outputs node-by-node", "The group chat template to dynamically route control between the agents", "The human-in-the-loop template that pauses execution of the workflow for input"], answer: 2 },
      { label: "Approval checkpoints", options: ["Add a Basic chat node.", "Add a Condition statement.", "Add an Ask a question node."], answer: 1 },
    ] },
  86: { type: "drag",
    pool: ["classify", "generate", "group", "string", "table"],
    slots: [{ label: "Field value type", answer: 3 }, { label: "Field method", answer: 1 }] },
  92: { type: "select", items: [
      { label: "Managed identity scope", options: ["Enable a system-assigned managed identity at the Foundry level.", "Enable a system-assigned managed identity at the project level.", "Create a service principal and store the principal's client secret."], answer: 1 },
      { label: "Key Vault authorization method", options: ["Add an API key to application settings.", "Add a Key Vault access policy for the secrets.", "Assign the Key Vault Secrets User role to the managed identity."], answer: 2 },
    ] },
  93: { type: "select", exhibit: ["img/q093_p110.jpg"], items: yn(
      ["Changing the content filtering configuration to low severity will resolve the fine-tuning job issues.", N],
      ["The difference between the 12% and 4% content harm defect rate is consistent with the different severity thresholds used in Run1 and Run2.", Y],
      ["The identical 6% protected material evaluation values across Run1 and Run2 indicate that this metric is unaffected by the change in the severity threshold.", Y]) },
  94: { type: "drag",
    pool: ["Hierarchical spans", "A KQL query filter", "Sampling", "Tool call attributes", "Trace sampling policy"],
    slots: [
      { label: "Capture all the nested operations across the entire agent run", answer: 0 },
      { label: "Record tool invocation arguments and results", answer: 3 },
    ] },
  95: { type: "drag",
    pool: ["Increase tenant-wide quotas.", "Move large content to files and use file search.", "Use additional agent tools to reduce the message size.", "Implement exponential backoff and jitter in the retry logic.", "Split content into smaller files before uploading the files."],
    slots: [{ label: "HTTP 429", answer: 3 }, { label: "HTTP 400", answer: 4 }] },
  98: { type: "select", exhibit: ["img/q098_p116.jpg"], items: [
      { label: "properties → category:", options: ["'AzureAIService'", "'AzureKeyVault'", "'AzureOpenAI'"], answer: 1 },
      { label: "authType:", options: ["'AccountKey'", "'AccountManagedIdentity'", "'ApiKey'"], answer: 1 },
    ] },
  99: { type: "select", items: [
      { label: "Knowledge grounding", options: ["Configure retrieval from approved data sources.", "Upload the policy documents direct to the agent.", "Embed the policy documents directly into the agent instructions."], answer: 0 },
      { label: "Memory", options: ["Use orchestration-managed session context.", "Enable agent memory that uses persistent storage.", "Retain user preferences in the state of the client application"], answer: 1 },
    ] },
  101: { type: "select",
    code: 'for brand in image_analysis.brands:\n    if brand.confidence >= 0.75:\n        print(f"\\nLogo of {brand.name} between {brand.rectangle.x}, {brand.rectangle.y} and {brand.rectangle.w}, {brand.rectangle.h}")',
    items: yn(
      ["The code will display the name of each detected brand with a confidence equal to or higher than 75 percent.", Y],
      ["The code will display coordinates for the top-left corner of the rectangle that contains the brand logo of the displayed brands.", Y],
      ["The code will display coordinates for the bottom-right corner of the rectangle that contains the brand logo of the displayed brands.", N]) },
  103: { type: "select", exhibit: ["img/q103_p122.jpg"],
    doubt: "截图答案选的是 --assign-identity。但用客户管理密钥（keySource: Microsoft.KeyVault）一般要用 --encryption 参数传这段 JSON，社区对这题有争议。",
    items: [
      { label: "az cognitiveservices account create ... --kind ____", options: ["AIServices", "LanguageAuthoring", "OpenAI"], answer: 2 },
      { label: "____ '{ \"keySource\": \"Microsoft.KeyVault\", ... }'", options: ["--api-properties", "--assign-identity", "--encryption"], answer: 1 },
    ] },
  104: { type: "select", exhibit: ["img/q104_p124.jpg"], items: [
      { label: "request =", options: ["AnalyzeTextOptions(categories=comment)", "AnalyzeTextOptions(text=[comment])", "AnalyzeTextOptions(text=comment)", "TextCategory.SELF_HARM(comment)"], answer: 2 },
      { label: "response =", options: ["client.analyze_image(request)", "client.analyze_text(request)", "client.moderate_text(request)", 'client.path("/text:analyze").post(request)'], answer: 1 },
    ] },
  107: { type: "select", exhibit: ["img/q107_p128.jpg"], items: yn(
      ["For sample_text, audit will include entity records for Contact and SSN.", N],
      ["For sample_text, text_for_model will include john.doe@contoso.com and 859-98-0987.", Y],
      ["For sample_text, text_for_model will contain entity type masks for John Doe and 312-555-1234.", Y]) },
  108: { type: "drag", ordered: true,
    pool: ["Initialize the training dataset.", "Train the classifier model.", "Create a project.", "Upload and tag images.", "Train the object detection model."],
    slots: [{ answer: 2 }, { answer: 3 }, { answer: 4 }] },
  112: { type: "drag", ordered: true,
    doubt: "截图答案是先删除被泄露的 key。但题目要求尽量减少停机时间，按常理应该先加新 key、改应用、最后删旧 key，社区对顺序有争议。",
    pool: ["Regenerate the primary admin key", "Regenerate the secondary admin key", "Change the app to use the secondary admin key", "Add a new query key", "Change the app to use the new key", "Delete the compromised key"],
    slots: [{ answer: 5 }, { answer: 3 }, { answer: 4 }] },
  113: { type: "select", exhibit: ["img/q113_p135.jpg"], items: [
      { label: "HTTP 方法 + https://management.azure.com/subscriptions/.../accounts/CS1?api-version=2021-04-30", options: ["PATCH", "POST", "PUT"], answer: 2 },
      { label: '"kind":', options: ["CognitiveServices", "ComputerVision", "TextAnalytics"], answer: 0 },
    ] },
  114: { type: "select", exhibit: ["img/q114_p137.jpg"], items: [
      { label: "The percentage of false positives is:", options: ["0", "25", "30", "50", "100"], answer: 0 },
      { label: "The value for the number of true positives divided by the total number of true positives and false negatives is:", options: ["0", "25", "30", "50", "100"], answer: 1 },
    ] },
  117: { type: "select", items: [
      { label: "JSON data", options: ["File projection", "Object projection", "Table projection"], answer: 1 },
      { label: "Extracted text data", options: ["File projection", "Object projection", "Table projection"], answer: 0 },
    ] },
  118: { type: "select", items: [
      { label: "Project Types", options: ["Classification", "Object Detection"], answer: 0 },
      { label: "Classification Types", options: ["Multiclass (Single tag per image)", "Multilabel (Multiple tags per image)"], answer: 0 },
      { label: "Domains", options: ["Adult", "Food", "General", "General (compact)", "Landmarks", "Landmarks (compact)", "Retail", "Retail (compact)"], answer: 3 },
    ] },
  121: { type: "select",
    code: 'text_analytics_client = TextAnalyticsClient(endpoint=endpoint, credential=AzureKeyCredential(key))\ndocuments = [\n    """\n    Our tour guide took us up the Space Needle during our trip to Seattle last week.\n    """\n]\nresult = text_analytics_client.recognize_linked_entities(documents)',
    items: yn(
      ["The code will detect the language of documents.", N],
      ["The url attribute returned for each linked entity will be a Bing search link.", Y],
      ["The matches attribute returned for each linked entity will provide the location in a document where the entity is referenced.", Y]) },
  122: { type: "select", items: [
      { label: "Model evaluation", options: ["Configure private endpoint access.", "Use deployment lists and license tabs.", "Use tool catalog connections and run traces.", "Use model catalog leaderboards and model cards."], answer: 3 },
      { label: "Deployment option", options: ["Bring your own model.", "Build a vector index.", "Use a serverless deployment.", "Use a managed compute deployment."], answer: 2 },
    ] },
  124: { type: "select", exhibit: ["img/q124_p149.jpg"], items: yn(
      ["The response will contain an explanation of large language models (LLMs) that has a high degree of certainty.", N],
      ['Changing "What is an LLM?" to "What is an LLM in the context of AI models?" will produce the intended response.', Y],
      ['Changing "You are a helpful assistant." to "You must answer only within the context of AI language models." will give a higher likelihood of producing the intended response.', Y]) },
  128: { type: "select", items: [
      { label: "Extract text", options: ["Azure AI Search", "Azure Vision in Foundry Tools", "Azure Document Intelligence in Foundry Tools"], answer: 2 },
      { label: "Perform sentiment analysis", options: ["Azure AI Search", "Azure AI Computer Vision", "Azure Document Intelligence in Foundry Tools", "Azure Language in Foundry Tools"], answer: 3 },
    ] },
  130: { type: "select",
    code: "docker run --rm -it -p 5000:5000 --memory 10g --cpus 2 \\\nmcr.microsoft.com/azure-cognitive-services/textanalytics/sentiment \\\nEula=accept \\\nBilling={ENDPOINT_URI} \\\nApiKey={API_KEY}",
    items: yn(
      ["Going to http://localhost:5000/status will query the Azure endpoint to verify whether the API key used to start the container is valid.", Y],
      ["The container logging provider will write log data.", Y],
      ["Going to http://localhost:5000/swagger will provide the details to access the documentation for the available endpoints.", Y]) },
  133: { type: "drag", ordered: true,
    doubt: "截图答案是“从 Docker Hub 拉镜像 → 隔离网络的 K8s → 用 API key + Endpoint 运行”。但认知服务容器镜像官方在 MCR 上，而且容器需要联网上报计费，社区对这题有争议。",
    pool: ["Pull an image from Docker Hub.", "Run the container and specify an API key and the Endpoint URL of the Azure AI resource.", "Provision an on-premises Kubernetes cluster that is isolated from the internet.", "Provision an on-premises Kubernetes cluster that has internet connectivity.", "Provision an Azure Kubernetes Service (AKS) resource.", "Run the container and specify an App ID and Client Secret.", "Pull an image from the Microsoft Container Registry (MCR)."],
    slots: [{ answer: 0 }, { answer: 2 }, { answer: 1 }] },
  134: { type: "select", items: [
      { label: "HTTP 方法", options: ["GET", "PATCH", "POST"], answer: 2 },
      { label: "https://*.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=____", options: ["description", "imageType", "objects", "tags"], answer: 1 },
    ] },
};
