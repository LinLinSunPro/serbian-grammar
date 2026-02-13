---
description: Generate a podcast from a local folder using NotebookLM
---

# NotebookLM Podcast Generation Workflow

This workflow describes the process of turning a folder of documents into an audio podcast.

## 1. Prepare Content

Ensure your source directory (e.g., `e:\Antigravity\Serbian`) contains the text files, PDFs, or markdown files you want to be discussed.

## 2. Customize Instructions (Optional but Recommended)

Create or edit `podcast_instructions.txt` in your source folder to control:

- Host personas (e.g., "You are Serbian language teachers")
- Language ratio (e.g., "60% Serbian, 40% English")
- Speaking speed (e.g., "Speak VERY SLOWLY")
- Format (e.g., "Read sentence → Translate → Drill keywords")

## 3. Generate Podcast (Manual Browser Method - Preferred)

**IMPORTANT: Always EDIT the existing notebook instead of creating new ones.**

1. Open `https://notebooklm.google.com/` in browser
2. If notebook exists:
   - Open the existing notebook
   - Delete old instruction source if needed
   - Add updated `podcast_instructions.txt` as a source
   - Click "Customize" on Audio Overview and paste instructions
   - Click "Generate"
3. If no notebook exists:
   - Create new notebook
   - Add sources (paste content from files)
   - Customize Audio Overview with instructions
   - Generate

## 4. Alternative: Command-Line Method (May Require Setup)

```bash
cd e:\Antigravity\NotebookLM
npx tsx scripts/generate-podcast.ts --dir "e:\Antigravity\Serbian" --name "Serbian_Lesson"
```

**Note:** This method may fail if authentication or workspace permissions are not configured.

## 5. Retrieve Audio

The generated MP3 will be available in NotebookLM (download from browser) or saved to your source directory if using the script.
