import http from "../common/http-common";

class BotService {
    getTemperateByCity(city) {
        return http.get("", {params: {city: city}});
    }
}

export default new BotService();