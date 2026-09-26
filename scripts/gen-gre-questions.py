#!/usr/bin/env python3
"""Regenerate content/courses/gre/questions.ts from the per-lesson banks.

Run after adding a GRE lesson with a questions.ts (lesson order follows
lib/modules.ts module numbers, then each lesson's frontmatter `order`)."""
import os, re
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ld = os.path.join(root, 'content', 'courses', 'gre', 'lessons')
mods = open(os.path.join(root, 'lib', 'modules.ts')).read()
num = {m[0]: int(m[1]) for m in re.findall(r"slug: '([^']+)',\s*\n\s*courseId: 'gre',\s*\n\s*number: (\d+),", mods)}
rows = []
for d in os.listdir(ld):
    mdx = os.path.join(ld, d, 'lesson.mdx')
    if not os.path.exists(os.path.join(ld, d, 'questions.ts')) or not os.path.exists(mdx):
        continue
    fm = open(mdx).read()
    mod = re.search(r'^module: (.+)$', fm, re.M).group(1)
    order = int(re.search(r'^order: (\d+)$', fm, re.M).group(1))
    rows.append((num.get(mod, 99), order, d))
rows.sort()
ident = lambda d: re.sub(r'-(\w)', lambda m: m.group(1).upper(), d.replace('gre-', ''))
out = ["import type { Question } from '@/lib/types';"]
out += [f"import {{ QUESTIONS as {ident(d)} }} from './lessons/{d}/questions';" for _, _, d in rows]
out += ["", "// GRE lesson checks, in curriculum order. Aggregated globally in",
        "// content/questions/index.ts. Regenerate with scripts/gen-gre-questions.py.",
        "export const QUESTIONS: Question[] = ["]
out += [f"  ...{ident(d)}," for _, _, d in rows]
out += ["];", ""]
open(os.path.join(root, 'content', 'courses', 'gre', 'questions.ts'), 'w').write("\n".join(out))
print(f"{len(rows)} lesson banks")
