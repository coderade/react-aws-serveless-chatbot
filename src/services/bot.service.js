import http from "../common/http-common";

class BotService {
    getTemperateByCity(city) {
        return http.get("", {params: {city: city}});
    }

    sendMessageToBot(message) {

        const userId = Math.random().toString();
        return http.post('', {
            "message_str": message,
            "user_id_str": userId
        })
    }
}

export default new BotService();