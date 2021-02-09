import getUser from '../../utils/getUser'

const apiGetUser = async (req, res) => {
  const data = await getUser('paulodev1612')
  res.send(data)
}

export default apiGetUser