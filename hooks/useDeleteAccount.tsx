export const useDeleteAccount = async (session: any) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session)
  }
  return await fetch('/api/delete_account_api', requestOptions)
}
