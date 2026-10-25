import os
from PIL import Image, ImageDraw, ImageFont

out_dir = r"D:\HoaiNhan\Code\Portfolio\public\assets\projects"
os.makedirs(out_dir, exist_ok=True)

font_title = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 64)
font_subtitle = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 36)
font_mono = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 26)
font_badge = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 28)

projects_meta = [
    {
        "filename": "quoting-dashboard",
        "title": "AI Quoting Orchestrator & Dashboard",
        "category": "ENTERPRISE AUTOMATION & CLEAN ARCHITECTURE",
        "stack": "React 19 • TypeScript • Python/FastAPI • PostgreSQL • Docker",
        "badges": ["409 Commits", "Clean Architecture / DDD", "Golden Eval Sets", "Cost Ledger"],
        "gradient": ((13, 22, 48), (24, 76, 120), (59, 130, 246)),
        "accent": (59, 130, 246),
        "code_snippet": [
            "// Clean Architecture - Domain Quoting Engine",
            "class QuotingOrchestrator(BaseAgentService):",
            "    async def evaluate_ticket(self, ticket: JiraTicket) -> QuoteDraft:",
            "        repo_context = await self.repo_parser.extract_ast_context()",
            "        eval_result = await self.eval_harness.run_golden_benchmark(ticket)",
            "        return self.cost_ledger.compute_and_record(eval_result)"
        ]
    },
    {
        "filename": "code-review",
        "title": "Self-Hosted AI Code Review Platform",
        "category": "AI-NATIVE DEVELOPER TOOLING & MCP",
        "stack": "FastMCP • Tree-sitter AST • Java/Spring Boot • Python • PostgreSQL",
        "badges": ["Model Context Protocol", "Tree-sitter AST Gates", "Multi-Stage LLM", "Zero Hallucination"],
        "gradient": ((20, 15, 45), (78, 38, 130), (168, 85, 247)),
        "accent": (168, 85, 247),
        "code_snippet": [
            "# FastMCP Tree-sitter Evidence Server",
            "@mcp.tool()",
            "def inspect_changed_hunks(repo_id: str, diff_hunk: str) -> CodeEvidence:",
            "    ast_nodes = tree_sitter_parser.build_symbol_graph(diff_hunk)",
            "    return quality_gates.enforce_evidence_boundary(ast_nodes)"
        ]
    },
    {
        "filename": "breast-cancer",
        "title": "BreastCare AI: Mobile Diagnostic System",
        "category": "MEDICAL AI & COMPUTER VISION (FJCAI 2026)",
        "stack": "React Native • TypeScript • FastAPI • MongoDB • CNN + GWO",
        "badges": ["FJCAI 2026 Paper", "0.97 Diagnostic Accuracy", "Grey Wolf Optimizer", "CBIS-DDSM Dataset"],
        "gradient": ((35, 12, 28), (120, 28, 68), (244, 63, 94)),
        "accent": (244, 63, 94),
        "code_snippet": [
            "# Grey Wolf Optimizer (GWO) - Feature Selection",
            "class GreyWolfOptimizer:",
            "    def optimize_cnn_weights(self, cbis_ddsm_features):",
            "        alpha_pos, beta_pos, delta_pos = self.init_pack()",
            "        # Test-set accuracy reaches 0.97 on mammography diagnosis",
            "        return self.train_eval_loop(alpha_pos, epochs=50)"
        ]
    },
    {
        "filename": "sales-automation",
        "title": "AI Sales & CRM Automation Pipeline",
        "category": "COMMERCIAL WORKFLOW ORCHESTRATION",
        "stack": "n8n • Zoho CRM • Telegram HITL • Calendly • Python • PostgreSQL",
        "badges": ["~100 Leads / Month", "-70% Manual Lead Time", "20+ n8n Workflows", "100% Gated Sends"],
        "gradient": ((10, 30, 30), (18, 90, 80), (16, 185, 129)),
        "accent": (16, 185, 129),
        "code_snippet": [
            "// Multi-step n8n Lead Orchestration & Human Approval",
            "const lead = $json.webhookBody;",
            "const qualifiedScore = await evaluateLeadFit(lead);",
            "if (qualifiedScore >= 85) {",
            "    await triggerTelegramApprovalGate({ lead, autoDraftQuote });",
            "    await syncToZohoCRM({ status: 'Awaiting_Human_Approval' });",
            "}"
        ]
    },
    {
        "filename": "multi-agent",
        "title": "Enterprise Multi-Agent System",
        "category": "AGENTIC ARCHITECTURE & LLM ORCHESTRATION",
        "stack": "Microsoft AutoGen • Azure OpenAI • Python • REST APIs",
        "badges": ["Central Orchestration", "4 Specialized Sub-Agents", "HR & Operations", "Stateful Routing"],
        "gradient": ((25, 20, 10), (110, 75, 20), (245, 158, 11)),
        "accent": (245, 158, 11),
        "code_snippet": [
            "# Microsoft AutoGen Multi-Agent Coordinator",
            "orchestrator = OrchestratorAgent(",
            "    name='Central_Router',",
            "    sub_agents=[hr_onboarding, task_reporting, ops_sync],",
            "    routing_strategy='context_aware_intent_matching'",
            ")"
        ]
    }
]

W, H = 1920, 1080
for p in projects_meta:
    img = Image.new("RGB", (W, H), color=(11, 15, 25))
    draw = ImageDraw.Draw(img)
    
    # Background subtle radial/vertical gradient
    c1, c2, c3 = p["gradient"]
    for y in range(H):
        ratio = y / H
        r = int(c1[0] * (1 - ratio) + 11 * ratio)
        g = int(c1[1] * (1 - ratio) + 15 * ratio)
        b = int(c1[2] * (1 - ratio) + 25 * ratio)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    
    # Draw glow ellipse in top-right
    for rad in range(300, 50, -25):
        alpha = int(15 * (1 - rad / 300))
        # Draw soft glowing circles
        draw.ellipse([W - 500 - rad, -100 - rad, W - 500 + rad, -100 + rad], outline=p["accent"])

    # Outer decorative card/window frame
    fx, fy, fw, fh = 100, 80, 1720, 920
    draw.rounded_rectangle([fx, fy, fx + fw, fy + fh], radius=24, fill=(13, 17, 28), outline=(40, 48, 70), width=2)
    
    # Window titlebar
    draw.rounded_rectangle([fx, fy, fx + fw, fy + 70], radius=24, fill=(20, 26, 42))
    draw.rectangle([fx, fy + 46, fx + fw, fy + 70], fill=(20, 26, 42))
    draw.line([(fx, fy + 70), (fx + fw, fy + 70)], fill=(40, 48, 70), width=1)
    
    # Window control dots
    draw.ellipse([fx + 30, fy + 26, fx + 48, fy + 44], fill=(239, 68, 68))
    draw.ellipse([fx + 60, fy + 26, fx + 78, fy + 44], fill=(245, 158, 11))
    draw.ellipse([fx + 90, fy + 26, fx + 108, fy + 44], fill=(16, 185, 129))
    draw.text((fx + 130, fy + 22), f"hoainhan.dev/projects/{p['filename']}", fill=(130, 140, 165), font=font_mono)

    # Category tag
    draw.text((fx + 60, fy + 110), p["category"], fill=p["accent"], font=font_badge)
    
    # Title
    draw.text((fx + 60, fy + 160), p["title"], fill=(255, 255, 255), font=font_title)
    
    # Stack subtitle
    draw.text((fx + 60, fy + 245), p["stack"], fill=(156, 163, 175), font=font_subtitle)

    # Badges row
    bx = fx + 60
    by = fy + 315
    for badge in p["badges"]:
        bw = int(draw.textlength(badge, font=font_badge)) + 36
        draw.rounded_rectangle([bx, by, bx + bw, by + 48], radius=12, fill=(25, 33, 52), outline=(50, 65, 95), width=1)
        draw.text((bx + 18, by + 9), badge, fill=(225, 235, 255), font=font_badge)
        bx += bw + 18

    # Code / UI mockup box
    cx, cy, cw, ch = fx + 60, fy + 395, fw - 120, 470
    draw.rounded_rectangle([cx, cy, cx + cw, cy + ch], radius=16, fill=(8, 11, 19), outline=(32, 40, 60), width=2)
    
    # Mockup inner header
    draw.line([(cx, cy + 45), (cx + cw, cy + 45)], fill=(25, 33, 50), width=1)
    draw.text((cx + 25, cy + 12), f"● active_service.ts / {p['filename']}.spec.ts", fill=(100, 116, 139), font=font_mono)

    # Code lines inside mockup
    code_y = cy + 70
    for line in p["code_snippet"]:
        if line.startswith("//") or line.startswith("#"):
            fill_c = (100, 116, 139)
        elif "class " in line or "def " in line or "const " in line or "@" in line:
            fill_c = p["accent"]
        elif "return " in line or "async " in line or "await " in line or "if " in line:
            fill_c = (236, 72, 153)
        else:
            fill_c = (226, 232, 240)
        draw.text((cx + 35, code_y), line, fill=fill_c, font=font_mono)
        code_y += 48

    # Save Desktop PNG & WebP
    png_path = os.path.join(out_dir, f"{p['filename']}.png")
    webp_path = os.path.join(out_dir, f"{p['filename']}.webp")
    img.save(png_path, "PNG", optimize=True)
    img.save(webp_path, "WEBP", quality=90)
    print(f"Generated {png_path} and {webp_path}")

    # Generate Mobile WebP (800x450)
    mobile_img = img.resize((800, 450), Image.Resampling.LANCZOS)
    mobile_webp_path = os.path.join(out_dir, f"{p['filename']}-mobile.webp")
    mobile_img.save(mobile_webp_path, "WEBP", quality=85)
    print(f"Generated {mobile_webp_path}")

print("All preview images generated successfully!")
