import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CommentArea from '../src/components/CommentArea';
import SingleComment from '../src/components/SingleComment';
import AddComment from '../src/components/AddComment';

// Mock delle chiamate API
global.fetch = vi.fn();

// Mock dei componenti figli
vi.mock('../src/components/CommentsList', () => ({
  default: ({ comments }) => (
    <div data-testid="comments-list">
      {comments.map(comment => (
        <div key={comment._id} data-testid="single-comment">
          {comment.comment}
        </div>
      ))}
    </div>
  )
}));

vi.mock('../src/components/AddComment', () => ({
  default: ({ asin, onAdd }) => (
    <div data-testid="add-comment">
      <button onClick={() => onAdd({ _id: 'new-id', comment: 'Nuovo commento', rate: 5 })}>
        Aggiungi commento
      </button>
    </div>
  )
}));

vi.mock('../src/components/Loading', () => ({
  default: () => <div data-testid="loading">Caricamento...</div>
}));

vi.mock('../src/components/Error', () => ({
  default: ({ message }) => <div data-testid="error">{message}</div>
}));

describe('CommentArea Component', () => {
  const mockComments = [
    {
      _id: '1',
      comment: 'Ottimo libro!',
      rate: 5,
      elementId: '123'
    },
    {
      _id: '2', 
      comment: 'Molto interessante',
      rate: 4,
      elementId: '123'
    }
  ];

  beforeEach(() => {
    fetch.mockClear();
  });

  it('verifica che il componente CommentArea venga renderizzato correttamente', async () => {
    // Mock della risposta API
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockComments
    });

    render(<CommentArea asin="123" />);

    // Verifica che inizialmente mostri il loading
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Aspetta che i commenti vengano caricati
    await waitFor(() => {
      expect(screen.getByTestId('comments-list')).toBeInTheDocument();
    });

    // Verifica che i commenti siano stati renderizzati
    expect(screen.getAllByTestId('single-comment')).toHaveLength(2);
    expect(screen.getByText('Ottimo libro!')).toBeInTheDocument();
    expect(screen.getByText('Molto interessante')).toBeInTheDocument();

    // Verifica che il componente AddComment sia presente
    expect(screen.getByTestId('add-comment')).toBeInTheDocument();
  });

  it('verifica che all\'avvio della pagina non ci siano istanze del componente SingleComment', () => {
    // Renderizza senza asin
    render(<CommentArea />);

    // Verifica che non ci siano commenti nel DOM
    expect(screen.queryByTestId('single-comment')).not.toBeInTheDocument();
    expect(screen.queryByTestId('comments-list')).not.toBeInTheDocument();
  });

  it('verifica che cliccando su un libro con recensioni, esse vengano caricate correttamente nel DOM', async () => {
    const mockComments = [
      { _id: '1', comment: 'Ottimo libro!', rate: 5, author: 'Mario' },
      { _id: '2', comment: 'Molto interessante', rate: 4, author: 'Luigi' },
      { _id: '3', comment: 'Consigliato!', rate: 5, author: 'Giuseppe' }
    ];
    
    // Mock della risposta API con commenti
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockComments
    });

    render(<CommentArea asin="123" />);

    // Aspetta che i commenti vengano caricati
    await waitFor(() => {
      expect(screen.getByText('Ottimo libro!')).toBeInTheDocument();
      expect(screen.getByText('Molto interessante')).toBeInTheDocument();
      expect(screen.getByText('Consigliato!')).toBeInTheDocument();
    });

    // Verifica che tutti i commenti siano presenti nel DOM
    const commentElements = screen.getAllByTestId('single-comment');
    expect(commentElements).toHaveLength(mockComments.length);

    // Verifica che la chiamata API sia stata effettuata con l'asin corretto
    expect(fetch).toHaveBeenCalledWith(
      'https://striveschool-api.herokuapp.com/api/comments/123',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('Bearer')
        })
      })
    );

    // Verifica che i testi dei commenti siano presenti
    expect(screen.getByText('Ottimo libro!')).toBeInTheDocument();
    expect(screen.getByText('Molto interessante')).toBeInTheDocument();
    expect(screen.getByText('Consigliato!')).toBeInTheDocument();
  });

  it('verifica la gestione degli errori durante il caricamento dei commenti', async () => {
    // Mock di una risposta di errore
    fetch.mockRejectedValueOnce(new Error('Errore di rete'));

    render(<CommentArea asin="123" />);

    // Aspetta che l'errore venga mostrato
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });
});