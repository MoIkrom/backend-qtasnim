/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const db = require("../config/postgre");

const createProduct = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into product (nama_barang, stock, jumlah_terjual, tanggal_transaksi, jenis_barang) values ($1,$2,$3,$4,$5) returning *";
    const {
      nama_barang,
      stock,
      jumlah_terjual,
      tanggal_transaksi,
      jenis_barang,
    } = body;
    db.query(
      query,
      [nama_barang, stock, jumlah_terjual, tanggal_transaksi, jenis_barang],
      (err, queryResult) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(queryResult);
      }
    );
  });
};

const editProduct = (body, params) => {
  return new Promise((resolve, reject) => {
    const {
      nama_barang,
      stock,
      jumlah_terjual,
      tanggal_transaksi,
      jenis_barang,
    } = body;
    const productId = parseInt(params.id);
    let query = "update product set ";
    const values = [];

    Object.keys(body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += `${key} = $${idx + 1} where id = $${idx + 2} returning *`;
        values.push(body[key], productId);
        return;
      }
      query += `${key} = $${idx + 1},`;
      values.push(body[key]);
    });
    db.query(query, values)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const deleteProduct = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from product where id = $1";

    db.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getProductById = (params) => {
  return new Promise((resolve, reject) => {
    const query = "select * from product where id = $1";
    db.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      return resolve(result);
    });
  });
};

const searchProduct = (queryparams, pageNumber, pageSize) => {
  return new Promise((resolve, reject) => {
    const offset = (pageNumber - 1) * pageSize;
    let query = "SELECT * FROM product ";

    // Search name product
    if (queryparams.search) {
      query += `where lower(nama_barang) LIKE lower('%${queryparams.search}%')`;
    }

    // Sorting
    if (queryparams.sort) {
      switch (queryparams.sort) {
        case "Nama Barang":
          query += " ORDER BY nama_barang ASC";
          break;
        case "Tanggal":
          query += " ORDER BY tanggal_transaksi DESC";
          break;
        default:
          break;
      }
    }

    query += ` LIMIT ${pageSize} OFFSET ${offset}`;

    db.query(query, (err, queryresult) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(queryresult);
    });
  });
};

const getAllProduct = () => {
  return new Promise((resolve, reject) => {
    const query = "select * from product ";
    const values = [];
    db.query(query, values, (err, queryResult) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(queryResult);
    });
  });
};
// const searchProduct = (queryParams) => {
//   return new Promise((resolve, reject) => {
//     const query = 'select * from product where lower(name_product) like lower($1) order by id_product asc ';
//     const values = [`%${queryParams.name_product}%`];
//     postgreDb.query(query, values, (err, queryResult) => {
//       if (err) {
//         console.log(err);
//         return reject(err);
//       }
//       return resolve(queryResult);
//     });
//   });
// };

// const shorthProduct = (queryParams) => {
//   return new Promise((resolve, reject) => {
//     let query = 'select * from product ';
//     if (queryParams.sort == 'low') {
//       query += 'order by price asc';
//     }
//     if (queryParams.sort == 'high') {
//       query += 'order by price desc';
//     }
//     if (queryParams.sort == 'creat_at_asc') {
//       query += 'order by product asc';
//     }
//     if (queryParams.sort == 'creat_at_desc') {
//       query += 'order by product desc';
//     }
//     if (queryParams.sort == 'favorite') {
//       query = 'select product.*, transactions.quanty from product inner join transactions on transactions.id_product = product.id_product order by transactions.quanty asc';
//     }
//     postgreDb.query(query, (err, result) => {
//       if (err) {
//         console.log(err);
//         return reject(err);
//       }
//       return resolve(result);
//     });
//   });
// };

// const filterProduct = (queryParams) => {
//   return new Promise((resolve, reject) => {
//     const query = 'select * from product where lower(category) like lower($1) order by id_product asc ';
//     const values = [`%${queryParams.category}%`];
//     postgreDb.query(query, values, (err, queryResult) => {
//       if (err) {
//         console.log(err);
//         return reject(err);
//       }
//       return resolve(queryResult);
//     });
//   });
// };

const repoProduct = {
  createProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
  getProductById,
  searchProduct,
};

module.exports = repoProduct;
