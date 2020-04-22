import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ListAllTransactionService from '../services/ListAllTransactionService';
import ReturnBalanceService from '../services/ReturnBalanceService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const listAllTransactions = new ListAllTransactionService(
      transactionsRepository,
    );

    const returnBalance = new ReturnBalanceService(transactionsRepository);

    const transactions = listAllTransactions.execute();
    const balance = returnBalance.execute();

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactions = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = createTransactions.execute({ title, value, type });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
