import axios from 'axios'
import { allowedReqProps } from './requestOptions'

/**
 * @description creates an AxiosInstance
 * @param config
 * @return {AxiosInstance}
 * @constructor
 */
export default function Req(config) {
  const reqConfig = allowedReqProps(config)
  return axios.create(reqConfig)
}
