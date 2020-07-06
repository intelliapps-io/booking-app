export interface CartState {
  services: {
    serviceId: string
  }[]
}

interface AddServiceAction {
  type: 'addService',
  payload: { serviceId: string }
}

interface RemoveServiceAction {
  type: 'removeService',
  payload: { serviceId: string }
}

interface ClearCartAction {
  type: 'clearCart',
  payload: undefined
}

export type CartReducerAction =
  AddServiceAction |
  RemoveServiceAction |
  ClearCartAction

export function cartReducer(state: CartState, action: CartReducerAction): CartState {
  switch (action.type) {
    case 'addService':
      window.localStorage.setItem('cart', JSON.stringify({ ...state, services: [...state.services, { serviceId: action.payload.serviceId } ] }))
      return { ...state, services: [...state.services, { serviceId: action.payload.serviceId } ] }
    case 'removeService':
      window.localStorage.setItem('cart', JSON.stringify({ ...state, services: state.services.filter(({ serviceId }) => serviceId !== action.payload.serviceId) }))
      return { ...state, services: state.services.filter(({ serviceId }) => serviceId !== action.payload.serviceId) }
    case 'clearCart':
      window.localStorage.setItem('cart', JSON.stringify({ services: [] }))
      return { services: [] }
    default:
      return state
  }
}

// Initialize Cart State
export function initializeCartState(): CartState {
  const cartData = window.localStorage.getItem('cart'),
    defaultState: CartState = { services: [] }
  
  if (cartData === null)
    return defaultState
  
  try {
    return JSON.parse(cartData)
  } catch (err) {
    return defaultState
  }
}