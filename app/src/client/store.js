import { PersistedState, RendererCachedPersistedState } from '@utils/store'

export default {
  state: {
    status: {
      type: 'none',
      message: '',
      progress: 0
    },
    sessions: [{id: null, ip: null, state: null}],
    sessionMap: {},
    bootComplete: false,
    client: new PersistedState({}),
    registrationComplete: new RendererCachedPersistedState(false),
    browserIntegrationComplete: new RendererCachedPersistedState(false)
  },
  mutations: {
    changeStatus(state, status) {
      state.status = status
    },
    clearStatus(state) {
      state.status = { type: 'none' }
    },
    registerClient(state, client) {
      state.client = client
      state.registrationComplete = true
    },
    completeBoot(state) {
      state.bootComplete = true
    },
    completeBrowserIntegration(state) {
      state.browserIntegrationComplete = true
    },
    updateSession(state, session) {
      if (session.id in state.sessionMap) {
        Object.assign(state.sessionMap[session.id], session)
      } else {
        state.sessionMap[session.id] = session
        state.sessions.push(session)
      }
    },
    removeSession(state, session) {
      let index = state.sessions.findIndex(s => s.id === session.id)
      state.sessions.splice(index, 1)
      delete state.sessionMap[session.id]
    }
  }
}