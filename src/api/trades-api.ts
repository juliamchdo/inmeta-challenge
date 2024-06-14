import { toast } from "vue3-toastify";
import api from "../services";

export class TradesApi {
  static async listAllTrades() {
    const params = {
      rpp: 20,
      page: 1
    }
    return await api.get('/trades', { params })
      .then((res) => res.data.list)
      .catch((error) => {
        const msg = error.response.data.message;
        toast(msg, {
          type: "error",
          transition: "slide",
          dangerouslyHTMLString: true,
        });
      });
  }

  static async addNewTrade(cards: any) {
    api.post('trades', { cards }).then(() => {
      toast('Solcitação de troca enviada', {
        "type": 'success',
        "transition": "slide",
        "dangerouslyHTMLString": true
      })
    }).catch((error) => {
      const msg = error.response.data.message;
      toast(msg, {
        "type": 'error',
        "transition": "slide",
        "dangerouslyHTMLString": true
      })
    })
  }

  static async deleteTrade(tradeId: string) {
    api.delete(`/trades/${tradeId}`).then(() => {
      toast('Solcitação de troca deletada!', {
        "type": 'success',
        "transition": "slide",
        "dangerouslyHTMLString": true
      })
    }).catch((error) => {
      const msg = error.response.data.message;
      toast(msg, {
        "type": 'error',
        "transition": "slide",
        "dangerouslyHTMLString": true
      })
    })
  }
}