import { render, screen, fireEvent } from '@testing-library/react';
import BookList from '../src/components/BookList';

// Mock dei componenti figli
vi.mock('../src/components/SingleBook', () => ({
  default: ({ book, selected, onClick }) => (
    <div 
      data-testid={`book-${book.asin}`}
      className={selected ? 'selected' : ''}
      onClick={onClick}
    >
      {book.title}
    </div>
  )
}));

vi.mock('../src/components/CommentArea', () => ({
  default: ({ asin }) => <div data-testid="comment-area">{`Commenti per ${asin}`}</div>
}));

describe('BookList Component', () => {
  // Mock di libri di esempio
  const mockBooks = [
    {
      asin: '111',
      title: 'Il Signore degli Anelli',
      img: 'https://example.com/lotr.jpg',
      price: 29.99,
      category: 'fantasy'
    },
    {
      asin: '222',
      title: 'Harry Potter',
      img: 'https://example.com/hp.jpg',
      price: 19.99,
      category: 'fantasy'
    },
    {
      asin: '333',
      title: 'Il Codice Da Vinci',
      img: 'https://example.com/davinci.jpg',
      price: 15.99,
      category: 'thriller'
    }
  ];

  beforeEach(() => {
    // Resetta tutti i mock prima di ogni test
    vi.clearAllMocks();
  });

  it('verifica che vengano renderizzate tante bootstrap cards quanti sono i libri nel file json', () => {
    render(<BookList books={mockBooks} />);
    
    // Verifica che tutti i libri siano presenti
    expect(screen.getByText('Il Signore degli Anelli')).toBeInTheDocument();
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('Il Codice Da Vinci')).toBeInTheDocument();
    
    // Verifica che il numero di card corrisponda al numero di libri
    const bookCards = screen.getAllByTestId(/book-/);
    expect(bookCards).toHaveLength(mockBooks.length);
  });

  it('verifica che il filtraggio dei libri tramite navbar si comporti come previsto - ricerca parziale', () => {
    render(<BookList books={mockBooks} />);
    
    // Ottieni il campo di ricerca e inserisci un testo parziale
    const searchInput = screen.getByPlaceholderText('Cerca per titolo...');
    fireEvent.change(searchInput, { target: { value: 'harry' } });
    
    // Verifica che solo il libro corrispondente sia visibile
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.queryByText('Il Signore degli Anelli')).not.toBeInTheDocument();
    expect(screen.queryByText('Il Codice Da Vinci')).not.toBeInTheDocument();
    
    // Verifica che il numero di card filtrate sia corretto
    const filteredCards = screen.getAllByTestId(/book-/);
    expect(filteredCards).toHaveLength(1);
  });
  
  it('verifica che il filtraggio sia case-insensitive', () => {
    render(<BookList books={mockBooks} />);
    
    // Test con maiuscole
    const searchInput = screen.getByPlaceholderText('Cerca per titolo...');
    fireEvent.change(searchInput, { target: { value: 'SIGNORE' } });
    
    expect(screen.getByText('Il Signore degli Anelli')).toBeInTheDocument();
    expect(screen.queryByText('Harry Potter')).not.toBeInTheDocument();
  });
  
  it('verifica che il filtraggio mostri tutti i libri quando il campo è vuoto', () => {
    render(<BookList books={mockBooks} />);
    
    const searchInput = screen.getByPlaceholderText('Cerca per titolo...');
    
    // Prima filtra
    fireEvent.change(searchInput, { target: { value: 'harry' } });
    expect(screen.getAllByTestId(/book-/)).toHaveLength(1);
    
    // Poi svuota il campo
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getAllByTestId(/book-/)).toHaveLength(mockBooks.length);
  });

  it('verifica che all\'avvio non ci siano istanze del componente SingleComment nel DOM', () => {
    render(<BookList books={mockBooks} />);
    
    // Verifica che il messaggio di selezione sia presente
    expect(screen.getByText('Seleziona un libro per visualizzare i commenti')).toBeInTheDocument();
    expect(screen.queryByTestId('comment-area')).not.toBeInTheDocument();
    
    // Verifica che non ci siano commenti singoli nel DOM
    expect(screen.queryByTestId('single-comment')).not.toBeInTheDocument();
  });

  it('verifica che l\'area commenti venga mostrata quando un libro è selezionato', () => {
    render(<BookList books={mockBooks} />);
    
    // Seleziona un libro
    const book = screen.getByTestId('book-111');
    fireEvent.click(book);
    
    // Verifica che l'area commenti sia visibile con l'asin corretto
    expect(screen.queryByText('Seleziona un libro per visualizzare i commenti')).not.toBeInTheDocument();
    expect(screen.getByTestId('comment-area')).toBeInTheDocument();
    expect(screen.getByText('Commenti per 111')).toBeInTheDocument();
  });

  it('verifica che cliccando su un secondo libro dopo il primo, il bordo del primo libro ritorni normale', () => {
    render(<BookList books={mockBooks} />);
    
    // Seleziona il primo libro
    const firstBook = screen.getByTestId('book-111');
    fireEvent.click(firstBook);
    expect(firstBook).toHaveClass('selected');
    
    // Seleziona il secondo libro
    const secondBook = screen.getByTestId('book-222');
    fireEvent.click(secondBook);
    
    // Verifica che solo il secondo libro sia selezionato
    expect(secondBook).toHaveClass('selected');
    expect(firstBook).not.toHaveClass('selected');
    expect(screen.getByTestId('book-333')).not.toHaveClass('selected');
  });
  
  it('verifica che cliccando su un libro il suo bordo cambi colore', () => {
    render(<BookList books={mockBooks} />);
    
    // Inizialmente nessun libro è selezionato
    const book = screen.getByTestId('book-222');
    expect(book).not.toHaveClass('selected');
    
    // Clicca sul libro
    fireEvent.click(book);
    
    // Verifica che ora sia selezionato
    expect(book).toHaveClass('selected');
  });
});