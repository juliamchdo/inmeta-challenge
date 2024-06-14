import { toast } from "vue3-toastify";
import api from "../services";

export class CardsApi {
  static async listAllCards() {
    const params = {
      rpp: 90,
      page: 1,
    };

    return await api.get("cards", { params })
      .then((res) => res.data.list.filter((a: { name: string }) => a.name != ""))
      .catch((error) => {
        const msg = error.response.data.message;
        toast(msg, {
          type: "error",
          transition: "slide",
          dangerouslyHTMLString: true,
        });
      });
  }

  static async listUserCards(){
    return await api.get('me/cards')
    .then((res) => res.data)
    .catch((error) => {
      const msg = error.response.data.message;
      toast(msg, {
        type: "error",
        transition: "slide",
        dangerouslyHTMLString: true,
      });
    });
  }

  static async addUserCard(params: { cardIds: string[]; }) {
    return await api.post('me/cards', params)
      .then(() => {
        toast("Nova carta adicionada com sucesso!", {
          "type": "success",
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
      })
      .catch((error) => {
        const msg = error.response.data.message;
        toast(msg, {
          "type": 'error',
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
      })

  }
}
