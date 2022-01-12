export const testAndPromptNetwork = async (desiredNetwork, currentNetwork) => {
  let chainId
  if (desiredNetwork === 'Ethereum') chainId = '0x1'
  if (desiredNetwork === 'Polygon') chainId = '0x89'

  if (currentNetwork !== desiredNetwork) {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params:[{ chainId: chainId }]
    });
  }
}