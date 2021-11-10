import * as core from '@actions/core'
import * as github from '@actions/github'
// import * as Webhooks from '@octokit/webhooks'

// import {wait} from './wait'
import {createActivity} from './createActivity'

// // Get the JSON webhook payload for the event that triggered the workflow//
const payload = JSON.stringify(github.context.payload, undefined, 2)
const objPayload = JSON.parse(payload)
const organizationId = parseInt(core.getInput('organizationId')) //OrganizationId é o id da empresa/organização cadastrada no artia. (informado no main.yml do workflow)
const accountId = parseInt(core.getInput('accountId')) //AccountId é o id do grupo de trabalho. (informado no main.yml do workflow)
const creatorEmail = core.getInput('creatorEmail') //Email criador do comentário (informado no main.yml do workflow).
const creatorPassword = core.getInput('creatorPassword') //Password (Váriavel de ambiente{sescrets.ARTIA_PASSWORD} informada no main.yml do workflow).
const folderId = parseInt(core.getInput('folderId')) //Id da pasta ou do projeto.

core.debug(' Teste ')

async function run(): Promise<void> {
  try {
    const issue = objPayload.issue
    const description = issue.body
    const categoryText = issue.labels.lenght > 0 ? issue.labels[0].name : ''
    const estimatedEffort = issue.title.split('[').pop().split(']')[0]
    const title = issue.title
      .replace('[', '')
      .replace(']', '')
      .replace(estimatedEffort, '')

    createActivity(
      organizationId,
      accountId,
      folderId,
      title,
      description,
      categoryText,
      estimatedEffort,
      creatorEmail,
      creatorPassword
    )

    // const ms: string = core.getInput('milliseconds')
    // core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString())

    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
