const { join } = require('path')
const { readdirSync, renameSync } = require('fs')
const DETAILS_DIR = join(__dirname, '../src/images/details')

const projects = readdirSync(DETAILS_DIR)

console.log(projects)
projects.forEach(cleanProject)

function cleanProject(project) {
  if (project === '.DS_Store') return
  const projectPath = join(DETAILS_DIR, project)
  const files = readdirSync(projectPath)
  // rename all files to be lowercase and replace spaces with dashes and replace file on disk
  files.forEach((file, index) => {
    const oldPath = join(projectPath, file)
    const newPath = join(projectPath, `${index}-page.png`)
    renameSync(oldPath, newPath)
  })
}
