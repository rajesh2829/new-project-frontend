import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";



class SlackService {

    static async connect() {
        const response = await apiClient.post(`${endpoints().slackAPI}/auth`);
        return response && response?.data
    }

    static async getChannelList() {
        const response = await apiClient.get(`${endpoints().slackAPI}/channel/list`);
        return response && response?.data
    }

    static async getUserList() {
        const response = await apiClient.get(`${endpoints().slackAPI}/user/list`);
        return response && response?.data
    }
    static async status() {
        const response = await apiClient.get(`${endpoints().slackAPI}/status`);
        return response && response?.data?.data
    }
}

export default SlackService;