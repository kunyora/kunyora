import axios from "axios"
import {allowedReqProps} from "../../util/req";

export default function Req(config) {
	const reqConfig = allowedReqProps(config)
	return axios.create(reqConfig)
}
