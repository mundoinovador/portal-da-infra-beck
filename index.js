import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["https://mundoinovador.github.io", "http://localhost:5173"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-email", async (req, res) => {
  const { nameUser, email, wpp, source } = req.body;
  console.log("Requisição recebida:", { nameUser, email, wpp, source });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nicolasnkprogramador@gmail.com",
      pass: "phck fnek fasx kqic",
    },
  });

  const mailOptions = {
    from: "nicolasnkprogramador@gmail.com",
    to: "nicolasnkprogramador@gmail.com",
    subject: "Novo contato do site",
    text: `Nome: ${nameUser}\nEmail: ${email}\nWhatsApp: ${wpp}\nFonte: ${source}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email enviado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao enviar o email.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta 3001"));
