do $$ declare t text; begin
  foreach t in array array['site_content','news','teachers','leadership','academic_programs','achievements','gallery_items','faq_items'] loop
    execute format('create policy "authenticated admins can manage %I" on public.%I for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null)', t, t);
  end loop;
end $$;
