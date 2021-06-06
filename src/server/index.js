import { createServer, Factory, Model } from "miragejs";

// for making a mock server
export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    //model has only one key i.e, product
    models: {
      product: Model,
    },

    factories: {
      //adding factory for auto seed
      product: Factory.extend({
        title(i) {
          return `Sample Product - ${i + 1}`;
        },
      }),
    },

    seeds(server) {
      //creating 6 mock prouducts in list
      server.createList("product", 6);
    },

    routes() {
      // use of api's endpoints will be .../api/...
      this.namespace = "api";
      //to get all the products
      this.get("/products", (schema) => {
        return schema.products.all();
      });
    },
  });

  return server;
}
