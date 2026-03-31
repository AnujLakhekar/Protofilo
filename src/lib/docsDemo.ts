import type { BlogDoc } from "./firestoreService";

export const pythonAgentDemoSid = "python-agent-quickstart";

export const pythonAgentDemoDoc: BlogDoc = {
  sid: pythonAgentDemoSid,
  appName: "Python Agent",
  title: "Python Agent: Local-First Quick Start and Documentation",
  summary:
    "A practical setup and usage guide for the Python Agent with multi-model support, tools, approval modes, and admin/operator workflow.",
  tags: ["python", "agent", "local-first", "ollama", "openai", "gemini"],
  createdAt: 0,
  updatedAt: 0,
  blocks: [
    {
      type: "paragraph",
      content:
        "A local-first coding and task agent with multi-model support (Ollama, OpenAI, Gemini), operator-style terminal UI, controlled tool execution, extensible tools, and short-term task memory.",
    },
    { type: "heading", content: "1) Quick Start" },
    {
      type: "code",
      language: "powershell",
      content: [
        "cd d:\\agent",
        "python -m venv .venv",
        ".\\.venv\\Scripts\\Activate.ps1",
        "pip install -r requirements.txt",
        "copy .env.example .env",
        "python main.py",
      ].join("\n"),
    },
    { type: "heading", content: "2) Set Model and Keys Globally" },
    {
      type: "list",
      items: [
        "Set AGENT_MODEL to one of: ollama:qwen2.5:3b, openai:gpt-4.1-mini, gemini:gemini-2.0-flash",
        "Set OPENAI_API_KEY for ChatGPT models",
        "Set GEMINI_API_KEY for Gemini models",
        "Set OLLAMA_BASE_URL for local Ollama",
      ],
    },
    { type: "heading", content: "3) Interface Commands" },
    {
      type: "code",
      language: "text",
      content: [
        "/help show commands",
        "/model <name> switch model at runtime",
        "/approval ask|auto|deny change tool approval mode",
        "/files [path] open sidepanel-style folder navigator",
        "/chapter [name] start a fresh context chapter (resets task memory)",
        "/rules print active rules",
        "/memory show short-term memory snapshot",
        "/clear clear current task memory",
        "exit quit",
      ].join("\n"),
    },
    { type: "heading", content: "4) Runtime Flow" },
    {
      type: "list",
      items: [
        "Chat and planning",
        "Execute tools when needed",
        "Continue chat with tool results",
        "Retry with a different method if a tool fails or no tool was used for an action request",
      ],
    },
    {
      type: "code",
      language: "text",
      content: [
        "Status: planning",
        "Status: executing",
        "Status: tool_result",
        "Status: retrying",
        "Status: completed",
      ].join("\n"),
    },
    { type: "heading", content: "5) Built-in Callable Tools" },
    {
      type: "list",
      items: [
        "create_document",
        "web_search",
        "scrape_website",
        "execute_python",
        "read_file",
        "write_file",
        "store_memory",
        "retrieve_memory",
        "call_api",
        "run_shell",
        "setup_react_app",
        "schedule_task",
        "get_scheduled_task_status",
      ],
    },
    {
      type: "paragraph",
      content:
        "For React app setup, prefer setup_react_app over raw shell commands. run_shell rejects mistyped wbsearch and instructs using web_search.",
    },
    { type: "heading", content: "6) Tool Manifest" },
    {
      type: "paragraph",
      content:
        "The strict manifest file is located at tool_docs/tool_manifest.json. Each tool includes name, description, tags, supported_tasks, and args for better tool selection across models.",
    },
    { type: "heading", content: "7) Add Your Own Tools" },
    {
      type: "list",
      items: [
        "Add a tool document in tool_docs/",
        "Register function in agent/tools/builtin_tools.py and map it in create_builtin_registry",
        "Restart the application",
      ],
    },
    { type: "heading", content: "8) Safety Model" },
    {
      type: "list",
      items: [
        "ask: prompts before each action",
        "auto: executes without prompting",
        "deny: blocks tool actions and returns denial result",
      ],
    },
    { type: "heading", content: "9) Notes" },
    {
      type: "paragraph",
      content:
        "The agent executes real actions only through tools. Keep WORKSPACE_ROOT constrained for safer local file operations. Web search uses DuckDuckGo Instant Answer API.",
    },
  ],
};
