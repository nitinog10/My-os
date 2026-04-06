# DynamoDB Single-Table Design

Table Name: webos-main
Billing: On-demand
Region: us-east-1

## Key Structure
PK (Partition Key): string  → userId
SK (Sort Key): string       → entity type + path

## Access Patterns

| PK         | SK                              | Data                        |
|------------|---------------------------------|-----------------------------|
| user#<id>  | PROFILE                         | name, email, avatar, plan   |
| user#<id>  | SETTINGS                        | theme, wallpaper, accent    |
| user#<id>  | DESKTOP                         | iconPositions, lastSession  |
| user#<id>  | FS#/home/                       | type:folder, meta           |
| user#<id>  | FS#/home/documents/             | type:folder, meta           |
| user#<id>  | FS#/home/documents/notes.txt    | type:file, content, size    |
| user#<id>  | APP#terminal                    | history[], cwd              |
| user#<id>  | APP#editor                      | openTabs[], activeTab       |

## GSI (Global Secondary Index)
- GSI1: SK → PK (reverse lookup for admin queries)
