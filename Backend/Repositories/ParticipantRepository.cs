﻿using Backend.Data;
using Backend.Dtos;
using Backend.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class ParticipantRepository : IParticipantRepository
    {
        private readonly CertificatesDbContext _context;
        public ParticipantRepository(CertificatesDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<ParticipantDto>> SearchParticipantsAsync(string? name, string? userId, string? department, string? plant)
        {
            var query = _context.Participants.AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(p => p.Name.Contains(name));

            if (!string.IsNullOrWhiteSpace(userId))
                query = query.Where(p => p.UserId.Contains(userId));

            if (!string.IsNullOrWhiteSpace(department))
                query = query.Where(p => p.Department.Contains(department));

            if (!string.IsNullOrWhiteSpace(plant))
                query = query.Where(p => p.Plant.Contains(plant));

            var participants = await query.ToListAsync();
            return participants.ToDtoList();
        }

        public async Task<List<ParticipantDto>> GetParticipantsByHandlesAsync(List<Guid> participantHandles)
        {
            if (participantHandles == null || participantHandles.Count == 0)
            {
                return new List<ParticipantDto>();
            }

            var particpants = await _context.Participants
                .Where(p => participantHandles.Contains(p.Handle))
                .ToListAsync();
            return particpants.ToDtoList();
        }
    }
}
