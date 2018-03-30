import Axios from 'axios'
const config = {
  file: {
    // 文件上传地址
    uploadUrl: Axios.defaults.baseURL + '/upload/file',
    // 文件下载地址
    downloadUrl: Axios.defaults.baseURL + '/upload/file'
  }
}
export default config
