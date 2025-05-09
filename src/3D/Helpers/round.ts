export const round = (n: number, toFixed: number = 2) => {
  return Math.round(n * 10**toFixed)/(10**toFixed) 
}
