export const getTradeResults = (state) => {
  return {
    purchase: state.purchase,
    sale: state.sale,
    balance: state.balance
  }
}

export const getAlertMessage = state => {
  return {
    msg: state.msg
  }
}
