import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class ListAllTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Transaction[] {
    const transactions = this.transactionsRepository.all();

    if (transactions.length <= 0) {
      throw Error('No transactions found. Please, create a new one');
    }

    return transactions;
  }
}

export default ListAllTransactionService;
