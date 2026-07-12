# Folders

Workspace organization (`defineFolder`). Folders are per-kind: a `model` folder
and an `agent` folder are separate resources even when they share a display
name. Resources reference a folder by handle (`folder: modelsFolder`) to group
under it in the UI.

Example here: `gtm.ts` defines a `GTM` models folder and a `GTM` agents folder.
