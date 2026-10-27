import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TaskDemo } from '@/components/site/TaskDemo';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe('Simulated model workflow', () => {
  it('requires approval and never calls a live model service', async () => {
    const request = vi.spyOn(globalThis, 'fetch');
    render(<TaskDemo />);
    fireEvent.click(screen.getByRole('button', { name: /Run sample task/ }));
    expect(screen.queryByRole('button', { name: /Approve sample changes/ })).not.toBeInTheDocument();
    const approve = await screen.findByRole('button', { name: /Approve sample changes/ }, { timeout: 3000 });
    expect(screen.getByText('Not applied')).toBeInTheDocument();
    fireEvent.click(approve);
    expect(screen.getByText('Applied in demo')).toBeInTheDocument();
    expect(request).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /Reset demonstration/ }));
    expect(screen.getByRole('button', { name: /Run sample task/ })).toBeEnabled();
    expect(screen.getByRole('combobox')).toBeEnabled();
  });
});