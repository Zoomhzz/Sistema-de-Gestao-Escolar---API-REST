# 🏫 Sistema de Gestão Escolar - API REST

Este projeto é uma API robusta para gerenciamento de instituições de ensino, permitindo o controle de Alunos, Professores e Cursos. Foca em segurança, integridade de dados e uma arquitetura limpa seguindo os padrões da indústria.

## 🛠️ Tecnologias e Conceitos Aplicados

* **Java 17 & Spring Boot 3**.
* **Spring Data JPA**: Persistência de dados eficiente.
* **Spring Security & BCrypt**: Implementação de criptografia para proteger matrículas e nomes em nível de banco de dados.
* **Jakarta Validation**: Validações rigorosas de entrada (campos obrigatórios, tamanhos e valores positivos).
* **Padrão DTO**: Separação total entre as entidades do banco de dados (Models) e os objetos de requisição/resposta (Request/Response DTOs).

---

## 🏗️ Estrutura do Projeto

### 1. Gestão de Entidades
* **Alunos**: Cadastro seguro com criptografia de matrícula e validação de duplicidade.
* **Professores**: Gerenciamento de turnos, matérias e salários, com proteção de dados via BCrypt.
* **Cursos**: Organização de matérias, professores responsáveis e controle de lotação de alunos.

### 2. Camada de Serviço (Business Logic)
Os serviços implementam regras de negócio críticas, como:
* **Validação de Duplicidade**: Verificação por matrícula (Alunos), nome (Professores) ou matéria (Cursos) antes da persistência.
* **Segurança**: Uso de `BCryptPasswordEncoder` para encriptar dados sensíveis antes do `repository.save()`.
* **Mapeamento de Resposta**: Conversão automatizada de entidades para DTOs de resposta, ocultando dados sensíveis ou desnecessários para o cliente da API.

---

## 🤝 Vamos nos conectar?

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/leandrocgsi)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/user/erudio)
[![DockerHub](https://img.shields.io/badge/DockerHub-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/u/leandrocgsi)
[![Stack Overflow](https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)](https://stackoverflow.com/users/41)

---

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Zoomhzz/gestao-escolar-api.git](https://github.com/Zoomhzz/gestao-escolar-api.git)
