import { render, screen, fireEvent } from '@testing-library/react';
import SingleBook from '../src/components/SingleBook';

describe('SingleBook Component', () => {
  // Mock di un libro di esempio
  const mockBook = {
    asin: '123456789',
    title: 'Libro di Test',
    img: 'https://example.com/image.jpg',
    price: 19.99,
    category: 'fantasy'
  };

  it('dovrebbe renderizzare il titolo del libro correttamente', () => {
    // Renderizza il componente
    render(<SingleBook book={mockBook} />);
    
    // Verifica che il titolo sia presente nel documento
    const titleElement = screen.getByText('Libro di Test');
    expect(titleElement).toBeInTheDocument();
  });

  it('dovrebbe renderizzare l\'immagine del libro con l\'URL corretto', () => {
    // Renderizza il componente
    render(<SingleBook book={mockBook} />);
    
    // Verifica che l'immagine abbia l'URL corretto
    const imgElement = screen.getByAltText('Libro di Test');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('verifica che, cliccando su un libro, il suo bordo cambi colore', () => {
    const mockOnClick = vi.fn();
    
    // Renderizza il componente con selected=true per simulare il click
    render(<SingleBook book={mockBook} selected={true} onClick={mockOnClick} />);
    
    // Ottieni la card e verifica lo stile del bordo rosso
    const cardElement = screen.getByRole('img').closest('.card');
    expect(cardElement).toHaveStyle('border: 3px solid red');
  });

  it('verifica che il bordo del primo libro ritorni normale quando si clicca su un secondo libro', () => {
    // Renderizza il componente con selected=false per simulare la deselezione
    render(<SingleBook book={mockBook} selected={false} />);
    
    // Ottieni la card e verifica che non abbia il bordo rosso
    const cardElement = screen.getByRole('img').closest('.card');
    expect(cardElement).not.toHaveStyle('border: 3px solid red');
  });

  it('dovrebbe chiamare la funzione onClick quando viene cliccato', () => {
    // Crea una funzione mock
    const mockOnClick = vi.fn();
    
    // Renderizza il componente con la funzione mock
    render(<SingleBook book={mockBook} onClick={mockOnClick} />);
    
    // Ottieni la card e simula un click
    const cardElement = screen.getByRole('img').closest('.card');
    fireEvent.click(cardElement);
    
    // Verifica che la funzione mock sia stata chiamata
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});