const fs = require('fs')
const path = require('path')
const vm = require('vm')

const inputPath =
  process.argv[2] || 'C:/projects/EasyRoadmaps/unified_system_design_roadmap - Copy.html'
const outputPath =
  process.argv[3] || path.join(process.cwd(), 'src', 'data', 'systemDesignSource.ts')

function readPhasesFromHtml(html) {
  const start = html.indexOf('const phases = ')
  const end = html.indexOf('const srcMap = {')

  if (start < 0 || end < 0 || end <= start) {
    throw new Error('Could not locate `const phases = [...]` block in the HTML source.')
  }

  const source = html
    .slice(start + 'const phases = '.length, end)
    .trim()
    .replace(/;\s*$/, '')

  return vm.runInNewContext(`(${source})`)
}

function serializeTs(value) {
  return JSON.stringify(value, null, 2)
    .replace(/[\u2028\u2029]/g, '')
}

function buildModuleId(phaseId, moduleTitle) {
  return `${phaseId}-${moduleTitle}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalize(phases) {
  return phases.map((phase) => ({
    id: phase.id,
    label: phase.label,
    title: phase.title,
    meta: phase.meta,
    color: phase.color,
    why: phase.why,
    modules: phase.modules.map((module) => ({
      id: buildModuleId(phase.id, module.title),
      tag: module.tag,
      tagColor: module.tagColor,
      title: module.title,
      source: module.source,
      dep: module.dep,
      topics: module.topics.map((topic) => ({
        t: topic.t,
        l: topic.l,
      })),
    })),
  }))
}

function main() {
  const html = fs.readFileSync(inputPath, 'utf8')
  const phases = normalize(readPhasesFromHtml(html))

  const file = `export type HtmlTopicLevel = 'beg' | 'int' | 'adv'\n\nexport type HtmlTopic = {\n  t: string\n  l: HtmlTopicLevel\n}\n\nexport type HtmlModule = {\n  id: string\n  tag: string\n  tagColor: string\n  title: string\n  source: string[]\n  dep: string | null\n  topics: HtmlTopic[]\n}\n\nexport type HtmlPhase = {\n  id: string\n  label: string\n  title: string\n  meta: string\n  color: string\n  why: string\n  modules: HtmlModule[]\n}\n\nexport const systemDesignSource: HtmlPhase[] = ${serializeTs(phases)}\n`

  fs.writeFileSync(outputPath, file)

  const moduleCount = phases.reduce((sum, phase) => sum + phase.modules.length, 0)
  const topicCount = phases.reduce(
    (sum, phase) => sum + phase.modules.reduce((inner, module) => inner + module.topics.length, 0),
    0,
  )

  console.log(`Wrote ${phases.length} phases, ${moduleCount} modules, ${topicCount} topics to ${outputPath}`)
}

main()
