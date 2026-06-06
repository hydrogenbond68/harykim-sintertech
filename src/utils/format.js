/**
 * Formats a numeric price into a currency string.
 * Default is Kenya Shillings (Ksh).
 * @param {number} price - The price to format.
 * @returns {string} The formatted price string.
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number') return price;
  
  // Format as Ksh X,XXX
  return `Ksh ${new Intl.NumberFormat('en-KE').format(price)}`;
};
