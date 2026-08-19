import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './app';

describe('App', () => {
  it('renders the primary landing-page content', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /炭の香りと/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /炭火で/ })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /WEB予約/ })[0]).toHaveAttribute(
      'href',
      '#reservation',
    );
    expect(screen.getByTestId('hero-ctas').querySelector('svg')).not.toBeInTheDocument();
    expect(screen.getByTestId('concept-image')).toBeInTheDocument();
    expect(screen.getByTestId('concept-copy')).toHaveTextContent('旬の魚。');
    expect(screen.getByTestId('menu-grid')).toBeInTheDocument();
    expect(screen.getByTestId('menu-card-4')).toHaveTextContent('鯛茶漬け');
    expect(screen.getByText('東京駅')).toBeInTheDocument();
    expect(screen.getByText('炭と酒 余白')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Googleマップで見る/ })).toHaveAttribute(
      'href',
      'https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%A7%85',
    );
  });

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'メニューを開く' }));
    expect(screen.getByRole('dialog', { name: 'モバイルメニュー' })).toBeInTheDocument();
    const dialog = screen.getByRole('dialog', { name: 'モバイルメニュー' });
    const closeButton = within(dialog).getByRole('button', { name: 'メニューを閉じる' });
    expect(closeButton).toHaveFocus();
    await user.tab({ shift: true });
    expect(within(dialog).getByRole('link', { name: /WEB予約/ })).toHaveFocus();
    await user.click(closeButton);
    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: 'モバイルメニュー' }),
      ).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'メニューを開く' })).toHaveFocus();
    });
  });
});
