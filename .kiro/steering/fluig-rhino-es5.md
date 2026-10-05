---
inclusion: fileMatch
fileMatchPattern: ['datasets/**/*.js', 'workflow/scripts/**/*.js', 'forms/**/events/*.js']
---

# Fluig — ECMA 5 / Rhino

Arquivos em `datasets/`, `workflow/scripts/` e `forms/*/events/` rodam no
motor Rhino. Não usar ES6+.

| Proibido | Use |
|---|---|
| `let` / `const` | `var` |
| `() => {}` | `function() {}` |
| `` `texto ${x}` `` | `"texto " + x` |
| `for (x of arr)` | `for (var i = 0; i < arr.length; i++)` |
| destructuring / spread / `class` | atribuição clássica e laço |

Formulários no navegador (`custom.js`, `zoom.js`) podem usar ES6+.
