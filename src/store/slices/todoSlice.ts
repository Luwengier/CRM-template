import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TodoState {
  list: string[]
}

export interface UpdateState {
  id: number
  contents: string
}

const initialState: TodoState = {
  list: JSON.parse(localStorage.getItem('list') as string) || [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string | undefined>) => {
      if (!action.payload) {
        return
      }
      state.list.push(action.payload)
      localStorage.setItem('list', JSON.stringify(state.list))
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const newTodo = state.list.filter(
        (item, index) => index !== action.payload
      )
      state.list = newTodo
      localStorage.setItem('list', JSON.stringify(newTodo))
    },
    updateTodo: (state, action: PayloadAction<UpdateState>) => {
      const newTodo = state.list.map((item, index) => {
        if (index === action.payload.id) {
          return action.payload.contents
        }
        return item
      })
      state.list = newTodo
      localStorage.setItem('list', JSON.stringify(newTodo))
    },
  },
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer
