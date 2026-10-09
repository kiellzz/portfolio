from pathlib import Path
from shutil import copy2

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public"


def link(url):
    visible = url.replace("https://", "").rstrip("/")
    return f'<link href="{url}" color="#1F4E79"><u>{visible}</u></link>'


def project(styles, name, stack, bullets, github, deploy, subtitle, labels):
    elements = [
        Paragraph(f"<b>{name}</b> <font color='#4A4A4A'>| {stack}</font>", styles["ProjectTitle"]),
    ]
    if subtitle:
        elements.append(Paragraph(subtitle, styles["ProjectMeta"]))
    elements.extend(Paragraph(f"- {bullet}", styles["ProjectBody"]) for bullet in bullets)

    links = f"<b>{labels['github']}:</b> {link(github)}"
    if deploy:
        links += f" &nbsp;&nbsp;|&nbsp;&nbsp; <b>{labels['deploy']}:</b> {link(deploy)}"
    elements.extend([Paragraph(links, styles["Links"]), Spacer(1, 2)])
    return KeepTogether(elements)


def make_styles():
    base = getSampleStyleSheet()
    return {
        "Name": ParagraphStyle(
            "Name",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=20.5,
            leading=22,
            textColor=colors.black,
            alignment=TA_CENTER,
            spaceAfter=1,
        ),
        "Role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.8,
            leading=11,
            textColor=colors.HexColor("#1F1F1F"),
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "Contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            leading=10,
            textColor=colors.HexColor("#303030"),
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "Section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=11.5,
            textColor=colors.black,
            spaceBefore=0,
            spaceAfter=0,
            keepWithNext=True,
        ),
        "Body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.1,
            leading=10.8,
            textColor=colors.HexColor("#202020"),
            spaceAfter=1,
        ),
        "Skill": ParagraphStyle(
            "Skill",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.8,
            leading=10.3,
            textColor=colors.HexColor("#202020"),
            spaceAfter=0.5,
        ),
        "ProjectTitle": ParagraphStyle(
            "ProjectTitle",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=10.7,
            textColor=colors.black,
            spaceBefore=1,
            spaceAfter=0.5,
            keepWithNext=True,
        ),
        "ProjectBody": ParagraphStyle(
            "ProjectBody",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.75,
            leading=10.3,
            leftIndent=8,
            firstLineIndent=-7,
            textColor=colors.HexColor("#202020"),
            spaceAfter=0.3,
        ),
        "ProjectMeta": ParagraphStyle(
            "ProjectMeta",
            parent=base["BodyText"],
            fontName="Helvetica-Oblique",
            fontSize=8.3,
            leading=9.6,
            textColor=colors.HexColor("#404040"),
            spaceAfter=0.5,
        ),
        "Links": ParagraphStyle(
            "Links",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.4,
            leading=8.8,
            textColor=colors.HexColor("#4A4A4A"),
            spaceAfter=0,
        ),
    }


CONTENT = {
    "pt": {
        "filename": "Curriculo_ATS_Ezequiel_Borges_PT.pdf",
        "public_filename": "EzequielBorges_portugueseCV.pdf",
        "title": "Currículo Ezequiel David Borges",
        "subject": "Currículo profissional para oportunidades em desenvolvimento Full Stack",
        "role": "DESENVOLVEDOR FULL STACK",
        "summary_title": "RESUMO PROFISSIONAL",
        "summary": (
            "Desenvolvedor Full Stack com atuação em React, TypeScript, Next.js, React Native e Node.js. "
            "Desenvolve aplicações web e mobile de ponta a ponta, com interfaces responsivas, autenticação, "
            "persistência de dados, comunicação em tempo real e deploy. Experiência prática em plataformas "
            "de comunidades, gestão financeira, operações de restaurantes, processamento de áudio e simuladores interativos."
        ),
        "skills_title": "COMPETÊNCIAS TÉCNICAS",
        "skills": [
            ("Linguagens", "TypeScript, JavaScript, HTML, CSS"),
            ("Frontend e mobile", "React, Next.js, React Native, Vite, Tailwind CSS, Framer Motion"),
            ("Backend e dados", "Node.js, Express.js, Supabase, PostgreSQL, MongoDB, WebSocket, Multer, FFmpeg"),
            ("Ferramentas", "Git, GitHub, Vercel, Render, Figma, Prompt Engineering"),
        ],
        "projects_title": "PROJETOS TÉCNICOS",
        "education_title": "FORMAÇÃO",
        "education": "<b>Faculdade Senac - Análise e Desenvolvimento de Sistemas</b> | Junho 2024 - Dezembro 2026 | Em andamento, 5º período",
        "languages_title": "IDIOMAS",
        "languages": "<b>Inglês</b> - Avançado",
        "labels": {"github": "GitHub", "deploy": "Deploy"},
        "projects": [
            (
                "Restaurant Flow System",
                "React Native, React, TypeScript, Node.js, MongoDB, WebSocket",
                [
                    "Desenvolveu sistema para restaurantes com cardápio digital, carrinho, pagamento via Pix e acompanhamento de pedidos, além de painel administrativo para gerenciar pedidos, status e produtos.",
                    "Usou WebSocket para atualizar o status dos pedidos em tempo real, mantendo cliente e painel sincronizados sem polling.",
                ],
                "https://github.com/kiellzz/restaurant-flow-system",
                "https://kiellzz.github.io/restaurant-flow-system/",
                None,
            ),
            (
                "Projeto Rotação de Cultura",
                "HTML, CSS, JavaScript",
                [
                    "Desenvolveu, em equipe de 6 pessoas, plataforma web responsiva de apoio ao planejamento de rotação de culturas, com base em resultados de quantum annealing.",
                    "Trabalhou com branches, pull requests e code review no GitHub, com tarefas em Kanban (Taiga).",
                ],
                "https://github.com/gislanysa/projeto-rotacao-cultura",
                None,
                "Residência Porto Digital: Faculdade Senac × Accenture | 2025",
            ),
            (
                "JoinClubs",
                "Next.js, React, TypeScript, Supabase, Tailwind CSS",
                [
                    "Construiu plataforma para conectar jogadores e clubes do EA SPORTS FC, com perfis, posições, preferências e sistema de conexões e amizades, em que cada usuário escolhe deixar o contato público ou visível apenas para conexões.",
                    "Modelou os dados no Supabase/PostgreSQL para permitir busca de jogadores e equipes por posição e preferências.",
                ],
                "https://github.com/kiellzz/joinclubs-showcase",
                "https://joinclubs.vercel.app/",
                None,
            ),
            (
                "EZSaldo",
                "Node.js, Express.js, MongoDB, JavaScript",
                [
                    "Criou aplicação financeira Full Stack com persistência de dados, dashboard de evolução financeira e gerenciamento de perfil e avatar.",
                    "Implementou autenticação JWT com rotas protegidas, isolando os dados financeiros de cada usuário, e testes automatizados de autenticação e transações.",
                ],
                "https://github.com/kiellzz/financial-tracker",
                "https://financial-tracker-1ky7.vercel.app/login.html",
                None,
            ),
            (
                "Slowed + Reverb Maker",
                "Node.js, Express.js, JavaScript, FFmpeg, Multer",
                [
                    "Implementou pipeline de upload e processamento de áudio com FFmpeg e limpeza automática de arquivos.",
                    "Exibiu progresso real de upload com XMLHttpRequest e criou pré-visualização com Web Audio API, melhorando a experiência antes do download.",
                ],
                "https://github.com/kiellzz/slowed-reverb-maker",
                "https://slowed-reverb-maker.onrender.com/",
                None,
            ),
            (
                "Ballers",
                "React, TypeScript, Vite",
                [
                    "Desenvolveu simulador de futebol com gerenciamento de cartas e motor de partidas orientado a decisões, eventos e duelos de atributos.",
                    "Separou o motor de partidas da interface em arquitetura modular e criou testes automatizados para validar suas regras e cenários.",
                ],
                "https://github.com/kiellzz/ballers-game",
                "https://ballers-game.vercel.app/",
                None,
            ),
        ],
    },
    "en": {
        "filename": "Ezequiel_Borges_ATS_Resume_EN.pdf",
        "public_filename": "EzequielBorges_englishCV.pdf",
        "title": "Ezequiel David Borges Resume",
        "subject": "Professional resume for Full Stack development opportunities",
        "role": "FULL STACK DEVELOPER",
        "summary_title": "PROFESSIONAL SUMMARY",
        "summary": (
            "Full Stack Developer working with React, TypeScript, Next.js, React Native, and Node.js. "
            "Builds end-to-end web and mobile applications with responsive interfaces, authentication, "
            "data persistence, real-time communication, and deployment. Hands-on experience with community "
            "platforms, financial management, restaurant operations, audio processing, and interactive simulators."
        ),
        "skills_title": "TECHNICAL SKILLS",
        "skills": [
            ("Languages", "TypeScript, JavaScript, HTML, CSS"),
            ("Frontend and mobile", "React, Next.js, React Native, Vite, Tailwind CSS, Framer Motion"),
            ("Backend and data", "Node.js, Express.js, Supabase, PostgreSQL, MongoDB, WebSocket, Multer, FFmpeg"),
            ("Tools", "Git, GitHub, Vercel, Render, Figma, Prompt Engineering"),
        ],
        "projects_title": "TECHNICAL PROJECTS",
        "education_title": "EDUCATION",
        "education": "<b>Faculdade Senac - Systems Analysis and Development</b> | June 2024 - December 2026 | In progress, 5th semester",
        "languages_title": "LANGUAGES",
        "languages": "<b>English</b> - Advanced | <b>Portuguese</b> - Native",
        "labels": {"github": "GitHub", "deploy": "Live"},
        "projects": [
            (
                "Restaurant Flow System",
                "React Native, React, TypeScript, Node.js, MongoDB, WebSocket",
                [
                    "Developed a restaurant platform with a digital menu, shopping cart, Pix payments, order tracking, and an admin dashboard for managing orders, statuses, and products.",
                    "Used WebSocket to update order statuses in real time, keeping customers and the admin dashboard synchronized without polling.",
                ],
                "https://github.com/kiellzz/restaurant-flow-system",
                "https://kiellzz.github.io/restaurant-flow-system/",
                None,
            ),
            (
                "Crop Rotation Project",
                "HTML, CSS, JavaScript",
                [
                    "Developed, as part of a six-person team, a responsive web platform for crop rotation planning based on quantum annealing results.",
                    "Worked with branches, pull requests, and GitHub code reviews while managing tasks through a Kanban workflow in Taiga.",
                ],
                "https://github.com/gislanysa/projeto-rotacao-cultura",
                None,
                "Porto Digital Technology Residency: Faculdade Senac × Accenture | 2025",
            ),
            (
                "JoinClubs",
                "Next.js, React, TypeScript, Supabase, Tailwind CSS",
                [
                    "Built a platform connecting EA SPORTS FC players and clubs through profiles, positions, preferences, and a connection and friendship system where users choose whether their contact details are public or visible only to connections.",
                    "Modeled data in Supabase/PostgreSQL to support player and club searches by position and preferences.",
                ],
                "https://github.com/kiellzz/joinclubs-showcase",
                "https://joinclubs.vercel.app/",
                None,
            ),
            (
                "EZSaldo",
                "Node.js, Express.js, MongoDB, JavaScript",
                [
                    "Created a Full Stack financial application with persistent data, a financial progress dashboard, and profile and avatar management.",
                    "Implemented JWT authentication with protected routes, isolating each user's financial data, and automated authentication and transaction tests.",
                ],
                "https://github.com/kiellzz/financial-tracker",
                "https://financial-tracker-1ky7.vercel.app/login.html",
                None,
            ),
            (
                "Slowed + Reverb Maker",
                "Node.js, Express.js, JavaScript, FFmpeg, Multer",
                [
                    "Implemented an audio upload and processing pipeline with FFmpeg and automatic file cleanup.",
                    "Displayed real upload progress with XMLHttpRequest and created previews with the Web Audio API, improving the experience before download.",
                ],
                "https://github.com/kiellzz/slowed-reverb-maker",
                "https://slowed-reverb-maker.onrender.com/",
                None,
            ),
            (
                "Ballers",
                "React, TypeScript, Vite",
                [
                    "Developed a football simulator with card management and a match engine driven by player decisions, events, and attribute-based duels.",
                    "Separated the match engine from the interface through a modular architecture and created automated tests to validate its rules and scenarios.",
                ],
                "https://github.com/kiellzz/ballers-game",
                "https://ballers-game.vercel.app/",
                None,
            ),
        ],
    },
}


def build_resume(language):
    content = CONTENT[language]
    styles = make_styles()
    output = OUTPUT_DIR / content["filename"]
    output.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        rightMargin=15 * mm,
        leftMargin=15 * mm,
        topMargin=9 * mm,
        bottomMargin=9 * mm,
        title=content["title"],
        author="Ezequiel David Borges",
        subject=content["subject"],
        keywords="Full Stack Developer, React, TypeScript, Next.js, React Native, Node.js, Supabase, PostgreSQL, MongoDB",
    )

    story = [
        Paragraph("Ezequiel David Borges", styles["Name"]),
        Paragraph(content["role"], styles["Role"]),
        Paragraph(
            "Recife, PE | +55 81 98748-5884 | ezequielborgesdev@gmail.com<br/>"
            f"{link('https://linkedin.com/in/ezequielborgesdev')} | {link('https://github.com/kiellzz')}",
            styles["Contact"],
        ),
        Paragraph(content["summary_title"], styles["Section"]),
        Spacer(1, 1.5),
        Paragraph(content["summary"], styles["Body"]),
        Spacer(1, 4),
        Paragraph(content["skills_title"], styles["Section"]),
        Spacer(1, 1.5),
    ]

    for label, values in content["skills"]:
        story.append(Paragraph(f"<b>{label}:</b> {values}", styles["Skill"]))

    story.extend([Spacer(1, 4), Paragraph(content["projects_title"], styles["Section"]), Spacer(1, 1.5)])

    for item in content["projects"]:
        story.append(project(styles, *item, content["labels"]))

    story.extend(
        [
            Spacer(1, 4),
            Paragraph(content["education_title"], styles["Section"]),
            Spacer(1, 1.5),
            Paragraph(content["education"], styles["Body"]),
            Spacer(1, 4),
            Paragraph(content["languages_title"], styles["Section"]),
            Spacer(1, 1.5),
            Paragraph(content["languages"], styles["Body"]),
        ]
    )

    doc.build(story)
    public_output = PUBLIC_DIR / content["public_filename"]
    copy2(output, public_output)
    return output, public_output


def build():
    for language in ("pt", "en"):
        output, public_output = build_resume(language)
        print(output)
        print(public_output)


if __name__ == "__main__":
    build()
