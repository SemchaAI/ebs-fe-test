import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MainBtn } from '../MainBtn';

vi.mock('./mainBtn.module.scss', () => ({
  button: 'button',
  text: 'text',
  default: 'default',
  full: 'full',
  icon: 'icon',
  contain: 'contain',
  outline: 'outline',
  contained: 'contained',
}));
// doesn`t work as expect
//only partial matches works correctly expect(button).toHaveClass(/default/i);

describe('MainBtn Component', () => {
  it('renders with default props', () => {
    render(<MainBtn />);
    const button = screen.getByRole('button', { name: /button/i });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-label', 'button');
    expect(button).toHaveClass(/default/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('applies custom class and modifiers v1', () => {
    render(
      <MainBtn
        className="custom-class"
        version="contain"
        size="full"
        icon
      />
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass(/button/i);
    expect(button).toHaveClass(/contain/i);
    expect(button).not.toHaveClass(/outline/i);
    expect(button).not.toHaveClass(/text/i);
    expect(button).toHaveClass(/full/i);
    expect(button).not.toHaveClass(/default/i);
    expect(button).toHaveClass(/icon/i);
  });
  it('applies custom class and modifiers v2', () => {
    render(
      <MainBtn
        className="custom-class"
        version="outline"
        size="default"
      />
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass(/outline/i);
    expect(button).not.toHaveClass(/contain/i);
    expect(button).not.toHaveClass(/text/i);
    expect(button).not.toHaveClass(/full/i);
  });

  it('renders children, and label', () => {
    render(<MainBtn label="Click Me">Click Me</MainBtn>);
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
  });

  it('handles onClick event', async () => {
    const handleClick = vi.fn();
    render(
      <MainBtn
        label="Click Me"
        onClick={handleClick}
      >
        Click Me
      </MainBtn>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    const user = userEvent.setup();

    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it('disables button when disabled prop is true', () => {
    render(<MainBtn disabled>Disabled</MainBtn>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Disabled');
  });

  it('sets the correct type attribute', () => {
    render(<MainBtn type="submit">Submit</MainBtn>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'submit');
  });
});
