import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const currentbalance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && currentbalance.total - value < 0) {
      throw Error('Your have no balace for this outcome.');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (title && value >= 0 && ['income', 'outcome'].includes(type)) {
      return transaction;
    }

    throw Error('Something is wrong with your request transaction.');
  }
}

export default CreateTransactionService;
