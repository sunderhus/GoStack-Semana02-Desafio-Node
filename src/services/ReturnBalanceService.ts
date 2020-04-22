import TransactionsRepository, {
  Balance,
} from '../repositories/TransactionsRepository';

class ReturnBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Balance {
    const balance = this.transactionsRepository.getBalance();

    if (balance.total < 0) {
      throw Error('your have no found to this outcome transaction.');
    }
    return balance;
  }
}

export default ReturnBalanceService;
