import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ul99syn2',
    dataset: 'production'
  },
  studioHost: 'temsvision',
  deployment: {
    appId: 'p98lpaoufuo0m6qt3u13xwbk',
    autoUpdates: true,
  }
})
