export const getTradeResults = (state) => {
  return {
    purchase: state.purchase,
    sale: state.sale,
    balance: state.balance
  }
}
