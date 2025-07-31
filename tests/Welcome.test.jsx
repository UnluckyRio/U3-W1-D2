import { render, screen } from '@testing-library/react';
import Welcome from '../src/components/Welcome';

describe('Welcome Component', () => {
  it('verifica che il componente Welcome venga montato correttamente', () => {
    // Renderizza il componente
    render(<Welcome />);
    
    // Verifica che il titolo sia presente nel documento
    const titleElement = screen.getByText('Benvenuto su EpiBooks!');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H2');
    
    // Verifica che il sottotitolo sia presente nel documento
    const subtitleElement = screen.getByText('Il tuo negozio online di libri preferito');
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement.tagName).toBe('P');
    
    // Verifica che l'Alert abbia la classe corretta
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toHaveClass('alert-info');
    expect(alertElement).toHaveClass('mt-4');
    expect(alertElement).toHaveClass('text-center');
  });
});