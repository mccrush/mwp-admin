//import { supabaseClient } from './../../supabase/supabaseClient'
import { supabase } from './../../supabase/adminAuthClient'

export default {
  state: {
    userId: null
  },

  mutations: {
    setAuthData(state, { type, data }) {
      state[type] = data
      //console.log('type =', type, ', data =', data);
    }
  },

  actions: {
    // Авторизация
    async logIn({ commit }, { email, password }) {
      try {
        // console.log(
        //   'auth.js logIn() email = ',
        //   email,
        //   ' password = ',
        //   password
        // )

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        //console.log('auth.js logIn() data = ', data)
        return true
      } catch (error) {
        console.error('auth.js logIn()', error)
      }

    },

    async logOut() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        console.error(error)
      }
    },

    // Регистрация
    // async signUp({ commit }, { email, password }) {
    //   try {
    //     const { data, error } = await supabaseClient.signUp({
    //       email,
    //       password,
    //       options: {
    //         data: {
    //           hi: 'test'
    //         }
    //       }
    //     })

    //     if (error) throw error
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
  },

  getters: {
    isLoggedIn: (state) => state.userId !== null
  }
}