import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:4321", "https://portal-da-infra-3bycvk1u9-nicolas-projects-3fb58508.vercel.app"],
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
    html: `
    <html>
      <head>
        <style>
          .text-container {
            background-color: #000;
            text-align: center;
            padding-block: 4rem 15rem;
          }

          h1 {
            color: white;
            margin-bottom: 2rem;
            margin-top: 4rem;
          }

          p {
            color:rgb(200, 200, 200);
          }

          ul li {
            text-align: left;
            color: white;
          }

          button {
            padding: 1rem 1.5rem;
            color: white;
            border: 1px solid white;
            background-color: black;
            margin-bottom: 4rem;
            cursor: pointer;
          }
        </style>
      </head>
    
      <body>

        <div class="text-container">
          <h1>Novo Lead</h1>
          <p>Um novo usuário acabou de preencher o formulário do site, ele está aguardando ser chamado</p>

          <ul>
            <li>Nome: ${nameUser}</li>
            <li>E-mail: ${email}</li>
            <li>Whatsapp: ${wpp}</li>
            <li>Plataforma de origem: ${source}</li>
          </ul>

          <button>Entrar em contato</button>
          <button>Mensagem automatica</button>
        </div>
      </body>
    </html>
  `,
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
