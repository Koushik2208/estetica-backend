const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.insertMany([
    {
      name: "Trillion Protein Transfusion",
      price: 2000,
      category: "Hair Treatment",
      stock: 10,
      description:
        "A deep repair hair treatment that targets internal hair damage, rebuilding broken bonds and restoring strength from within.",
      imageUrl: "https://ik.imagekit.io/jsmasterykoushik/estetica/trillion.png",
    },
    {
      name: "TIRTIR Mask Fit Red Cushion",
      price: 2050,
      category: "Makeup",
      stock: 25,
      description:
        "A cushion foundation with buildable coverage and long-lasting wear, loved for its flawless, glowing finish.",
      imageUrl:
        "https://ik.imagekit.io/jsmasterykoushik/estetica/tir%20tir.png",
    },
    {
      name: "Kay Beauty Hydrating Foundation",
      price: 1299,
      category: "Makeup",
      stock: 30,
      description:
        "A hydrating foundation that provides natural to high coverage, enriched with avocado and mango butter.",
      imageUrl: "https://ik.imagekit.io/jsmasterykoushik/estetica/kay.png",
    },
    {
      name: "Suroskie My Glow All-in-One Tinted Moisturizer with SPF 30",
      price: 639,
      category: "Makeup",
      stock: 15,
      description:
        "A multitasking tinted moisturizer that blends hydration, sun protection, and a radiant, sheer finish.",
      imageUrl: "https://ik.imagekit.io/jsmasterykoushik/estetica/Suroskie.png",
    },
    {
      name: "L'Oreal Professionnel Serie Expert Absolut Repair Molecular Deep Repairing Leave-In Cream",
      price: 2000,
      category: "Hair Care",
      stock: 20,
      description:
        "A leave-in cream for very damaged hair, formulated with peptides bonder and 5 amino acids to repair hair macro-molecular structure.",
      imageUrl: "https://ik.imagekit.io/jsmasterykoushik/estetica/loreal.png",
    },
    {
      name: "L'Oreal Professionnel Hair Spa Deep Nourishing Creambath",
      price: 600,
      category: "Hair Care",
      stock: 40,
      description:
        "A deep nourishing creambath for chemically treated hair, designed to provide deep conditioning and nourishment.",
      imageUrl:
        "https://ik.imagekit.io/jsmasterykoushik/estetica/loreal-p-h.png",
    },
    {
      name: "L'Oreal Professionnel Hair Spa Repairing Creambath",
      price: 768,
      category: "Hair Care",
      stock: 35,
      description:
        "A repairing creambath that provides deep conditioning and helps to repair damaged hair.",
      imageUrl: "https://ik.imagekit.io/jsmasterykoushik/estetica/loreal-p.png",
    },
    {
      name: "L'Oreal Professionnel Serie Expert Absolut Repair Molecular Deep Repair Rinse-Off Serum",
      price: 1600,
      category: "Hair Care",
      stock: 18,
      description:
        "A rinse-off serum for very damaged hair that works with the shampoo and leave-in cream to repair hair's molecular structure.",
      imageUrl: "https://ik.imagekit.io/jsmasterykoushik/estetica/loreal-p.png",
    },
    {
      name: "L'Oreal Professionnel Serie Expert Density Advanced Shampoo",
      price: 790,
      category: "Hair Care",
      stock: 22,
      description:
        "A shampoo for thinning hair that gently purifies the scalp and gives a feeling of renewed density.",
      imageUrl:
        "https://ik.imagekit.io/jsmasterykoushik/estetica/loreal-p-h.png",
    },
    {
      name: "Suroskie My Glow All-in-One Tinted Moisturizer with SPF 30 (Pack of 2)",
      price: 1099,
      category: "Makeup",
      stock: 5,
      description:
        "A pack of two multitasking tinted moisturizers that blends hydration, sun protection, and a radiant, sheer finish.",
      imageUrl: "https://ik.imagekit.io/jsmasterykoushik/estetica/Suroskie.png",
    },
    {
      name: "L'Oreal Professionnel Scalp Advanced Anti-Oiliness Dermo-Purifier Shampoo",
      price: 990,
      category: "Hair Care",
      stock: 28,
      description:
        "An anti-oiliness shampoo that gently purifies the scalp and helps to regulate oil production.",
      imageUrl:
        "https://ik.imagekit.io/jsmasterykoushik/estetica/loreal-p-d.png",
    },
    {
      name: "TIRTIR Mask Fit Red Cushion (refill)",
      price: 1500,
      category: "Makeup",
      stock: 50,
      description:
        "A refill for the TIRTIR Mask Fit Red Cushion, providing a sustainable and cost-effective way to replenish your favorite foundation.",
      imageUrl:
        "https://ik.imagekit.io/jsmasterykoushik/estetica/tir%20tir.png",
    },
    {
      name: "L'Oreal Professionnel Serie Expert Absolut Repair Molecular Sulfate-Free Deep Repair Shampoo",
      price: 1490,
      category: "Hair Care",
      stock: 25,
      description:
        "A sulfate-free deep repair shampoo for very damaged hair, part of the Absolut Repair Molecular range.",
      imageUrl: "https://ik.imagekit.io/jsmasterykoushik/estetica/loreal.png",
    },
    {
      name: "L'Oreal Professionnel Hair Spa Hydrating Concentrate",
      price: 768,
      category: "Hair Treatment",
      stock: 15,
      description:
        "A hydrating concentrate for dry and sensitive scalps, part of the Hair Spa line.",
      imageUrl: "https://ik.imagekit.io/jsmasterykoushik/estetica/loreal-p.png",
    },
  ]);
  console.log("Seeded products");
  mongoose.disconnect();
});
