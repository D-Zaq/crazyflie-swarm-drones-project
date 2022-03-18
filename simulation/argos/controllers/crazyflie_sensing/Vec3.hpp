#ifndef VEC3_HPP
#define VEC3_HPP

#include "Vec4.hpp"
#include <cmath>

class Vec3
{
public:
    static constexpr Vec4 add(const Vec4 &a, const Vec4 &b)
    {
        return {a.x() + b.x(), a.y() + b.y(), a.z() + b.z()};
    }

    static constexpr void add(Vec4 *a, const Vec4 &b)
    {
        a->v_[1] += b.v_[1];
        a->v_[2] += b.v_[2];
        a->v_[3] += b.v_[3];
    }

    static constexpr Vec4 sub(const Vec4 &a, const Vec4 &b)
    {
        return {a.x() - b.x(), a.y() - b.y(), a.z() - b.z()};
    }

    static constexpr void sub(Vec4 *a, const Vec4 &b)
    {
        a->v_[1] -= b.v_[1];
        a->v_[2] -= b.v_[2];
        a->v_[3] -= b.v_[3];
    }

    static constexpr std::float_t sum(const Vec4 &a)
    {
        return a.x() + a.y() + a.z();
    }

    static constexpr std::float_t norm_sqr(const Vec4 &a)
    {
        return sum(Vec4(0, static_cast<std::float_t>(std::pow(a.x(), 2)),
                        static_cast<std::float_t>(std::pow(a.y(), 2)),
                        static_cast<std::float_t>(std::pow(a.z(), 2))));
    }

    static constexpr std::float_t norm(const Vec4 &a)
    {
        return std::sqrt(norm_sqr(a));
    }
};

#endif /* VEC3_HPP */

